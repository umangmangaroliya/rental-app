"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
    applyFilters,
    clearFilters,
    setCategory,
    setProducts,
    setSortBy,
    toggleSize,
} from "@/store/slices/productsSlice";
import { ChevronDown, Filter, Heart, Star } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

// Mock data - replace with API call
const mockProducts = [
  {
    id: "1",
    name: "Classic Black Tuxedo",
    description: "Elegant black tuxedo perfect for formal events",
    price: 75,
    category: "men",
    images: ["/product-1.jpg"],
    sizes: ["38R", "40R", "42R", "44R"],
    rating: 4.8,
    reviews: 124,
  },
  {
    id: "2",
    name: "Navy Blue Suit",
    description: "Modern navy suit for business and formal occasions",
    price: 65,
    category: "men",
    images: ["/product-2.jpg"],
    sizes: ["38R", "40R", "42R", "44R", "46R"],
    rating: 4.9,
    reviews: 98,
  },
  {
    id: "3",
    name: "Elegant Evening Gown",
    description: "Stunning red evening gown with elegant draping",
    price: 95,
    category: "women",
    images: ["/product-3.jpg"],
    sizes: ["XS", "S", "M", "L"],
    rating: 5.0,
    reviews: 156,
  },
  {
    id: "4",
    name: "Cocktail Dress",
    description: "Chic black cocktail dress for semi-formal events",
    price: 55,
    category: "women",
    images: ["/product-4.jpg"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.7,
    reviews: 89,
  },
  {
    id: "5",
    name: "Designer Bow Tie Set",
    description: "Premium silk bow tie with matching pocket square",
    price: 25,
    category: "accessories",
    images: ["/product-5.jpg"],
    sizes: ["One Size"],
    rating: 4.6,
    reviews: 67,
  },
  {
    id: "6",
    name: "Pearl Necklace",
    description: "Elegant pearl necklace for formal occasions",
    price: 35,
    category: "accessories",
    images: ["/product-6.jpg"],
    sizes: ["One Size"],
    rating: 4.9,
    reviews: 112,
  },
];

export default function ProductsPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const dispatch = useAppDispatch();

  const { filteredItems, selectedCategory, selectedSizes, sortBy } = useAppSelector(
    (state) => state.products
  );

  useEffect(() => {
    // Initialize products
    dispatch(setProducts(mockProducts));
    dispatch(applyFilters());
  }, [dispatch]);

  const handleCategoryChange = (category: string | null) => {
    dispatch(setCategory(category));
    dispatch(applyFilters());
  };

  const handleSizeToggle = (size: string) => {
    dispatch(toggleSize(size));
    dispatch(applyFilters());
  };

  const handleSortChange = (sort: typeof sortBy) => {
    dispatch(setSortBy(sort));
    dispatch(applyFilters());
    setIsSortOpen(false);
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const categories = [
    { value: "men", label: "Men's Wear" },
    { value: "women", label: "Women's Wear" },
    { value: "accessories", label: "Accessories" },
  ];

  const sizes = ["XS", "S", "M", "L", "XL", "38R", "40R", "42R", "44R", "46R"];

  const sortOptions = [
    { value: "popular", label: "Most Popular" },
    { value: "newest", label: "Newest First" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900">Shop Collection</h1>
            <p className="text-gray-600 mt-1">
              {filteredItems.length} {filteredItems.length === 1 ? "item" : "items"} available
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-blue-600 transition-colors"
              >
                <span className="text-sm font-medium text-gray-700">
                  {sortOptions.find((opt) => opt.value === sortBy)?.label}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>

              {isSortOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleSortChange(option.value as typeof sortBy)}
                      className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                        sortBy === option.value ? "text-blue-600 font-medium" : "text-gray-700"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside
            className={`${
              isFilterOpen ? "block" : "hidden"
            } md:block w-full md:w-64 flex-shrink-0`}
          >
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Filters</h3>
                {(selectedCategory || selectedSizes.length > 0) && (
                  <button
                    onClick={handleClearFilters}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Categories */}
              <div className="mb-8">
                <h4 className="font-semibold text-gray-900 mb-4">Category</h4>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <label key={category.value} className="flex items-center cursor-pointer group">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === category.value}
                        onChange={() => handleCategoryChange(category.value)}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="ml-3 text-sm text-gray-700 group-hover:text-blue-600 transition-colors">
                        {category.label}
                      </span>
                    </label>
                  ))}
                  <label className="flex items-center cursor-pointer group">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === null}
                      onChange={() => handleCategoryChange(null)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-3 text-sm text-gray-700 group-hover:text-blue-600 transition-colors">
                      All Categories
                    </span>
                  </label>
                </div>
              </div>

              {/* Sizes */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Size</h4>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => handleSizeToggle(size)}
                      className={`py-2 px-3 text-sm font-medium rounded-lg border-2 transition-all ${
                        selectedSizes.includes(size)
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-700 border-gray-200 hover:border-blue-600"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {filteredItems.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters</p>
                <button
                  onClick={handleClearFilters}
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                  >
                    {/* Product Image */}
                    <div className="relative aspect-[3/4] bg-gray-200 overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        Product {product.id}
                      </div>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>

                      {/* Wishlist Button */}
                      <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all opacity-0 group-hover:opacity-100">
                        <Heart className="w-5 h-5 text-gray-700" />
                      </button>
                    </div>

                    {/* Product Info */}
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                          {product.name}
                        </h3>
                      </div>

                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {product.description}
                      </p>

                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium text-gray-900">{product.rating}</span>
                        </div>
                        <span className="text-sm text-gray-500">({product.reviews})</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                          <span className="text-sm text-gray-500 ml-1">/day</span>
                        </div>
                        <div className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                          {product.sizes.length} sizes
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Overlay */}
      {isFilterOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsFilterOpen(false)}
        ></div>
      )}
    </div>
  );
}
