import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// ----------------------------
// Types
// ----------------------------

export type PricingOption = 'Free' | 'Paid' | 'View Only';
type SortOption = 'Item Name' | 'Higher Price' | 'Lower Price';

export interface ContentItem {
  id: string;
  userName: string;
  title: string;
  price?: number;
  pricingOption: PricingOption;
  imageUrl: string;
}

// API raw response type
interface RawContentItem {
  id: string;
  creator: string;
  title: string;
  pricingOption: number; // 0 = Paid, 1 = Free, 2 = View Only
  imagePath: string;
  price?: number;
}

interface ContentState {
  allData: ContentItem[];
  displayedData: ContentItem[];
  filters: PricingOption[];
  keyword: string;
  currentPage: number;
  itemsPerPage: number;
  sortOption: SortOption;
  loading: boolean;
  error: string | null;
}

const initialState: ContentState = {
  allData: [],
  displayedData: [],
  filters: [],
  keyword: '',
  currentPage: 1,
  itemsPerPage: 20,
  sortOption: 'Item Name',
  loading: false,
  error: null,
};

// ----------------------------
// Async thunk for API call
// ----------------------------

export const fetchContents = createAsyncThunk(
  'content/fetchContents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<RawContentItem[]>(
        'https://closet-recruiting-api.azurewebsites.net/api/data'
      );

      // Transform raw API data into the format we want
      const transformed: ContentItem[] = response.data.map((item) => ({
        id: item.id,
        userName: item.creator,
        title: item.title,
        pricingOption:
          item.pricingOption === 0
            ? 'Paid'
            : item.pricingOption === 1
            ? 'Free'
            : 'View Only',
        imageUrl: item.imagePath,
        price: item.price,
      }));

      return transformed;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// ----------------------------
// Helper: Apply filters & search
// ----------------------------

const applyFiltersSearchSort = (
  data: ContentItem[],
  filters: PricingOption[],
  keyword: string,
  sort: SortOption
) => {
  let filtered = data.filter((item) => {
    const matchesFilter =
      filters.length === 0 || filters.includes(item.pricingOption);

    const matchesKeyword =
      keyword.trim() === '' ||
      item.userName.toLowerCase().includes(keyword.toLowerCase()) ||
      item.title.toLowerCase().includes(keyword.toLowerCase());

    return matchesFilter && matchesKeyword;
  });

  if (sort === 'Item Name') {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sort === 'Higher Price') {
    filtered.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
  } else if (sort === 'Lower Price') {
    filtered.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
  }

  return filtered;
};



// ----------------------------
// Slice
// ----------------------------

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<PricingOption[]>) {
      state.filters = action.payload;
      state.currentPage = 1;
      const filtered = applyFiltersSearchSort(state.allData, state.filters, state.keyword, state.sortOption);
      state.displayedData = filtered.slice(0, state.itemsPerPage);
    },
    setKeyword(state, action: PayloadAction<string>) {
      state.keyword = action.payload;
      state.currentPage = 1;
      const filtered = applyFiltersSearchSort(state.allData, state.filters, state.keyword, state.sortOption);
      state.displayedData = filtered.slice(0, state.itemsPerPage);
    },
    resetFilters(state) {
      state.filters = [];
      state.keyword = '';
      state.currentPage = 1;
      state.displayedData = state.allData.slice(0, state.itemsPerPage);
    },
    loadMore(state) {
      state.currentPage += 1;
      const filtered = applyFiltersSearchSort(state.allData, state.filters, state.keyword, state.sortOption);
      state.displayedData = filtered.slice(0, state.currentPage * state.itemsPerPage);
    },
    setSortOption(state, action: PayloadAction<SortOption>) {
      state.sortOption = action.payload;
      const filtered = applyFiltersSearchSort(state.allData, state.filters, state.keyword, state.sortOption);
      state.displayedData = filtered.slice(0, state.currentPage * state.itemsPerPage);
    },
  

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContents.fulfilled, (state, action) => {
        state.loading = false;
        state.allData = action.payload;
        const filtered = applyFiltersSearchSort(action.payload, state.filters, state.keyword, state.sortOption);
        state.displayedData = filtered.slice(0, state.itemsPerPage);
      })
      .addCase(fetchContents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setFilters, setKeyword, resetFilters, loadMore, setSortOption } = contentSlice.actions;

export default contentSlice.reducer;
