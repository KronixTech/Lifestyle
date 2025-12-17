export const FILTERS = {
    CATEGORY: [
      "Shirts",
      "T-Shirts",
      "Pants",
      "Jackets & Hoodies",
      "Innerwear",
      "Shorts",
      "Tanktops",
      "Accessories",
      "Sportswear",
    ],
    PRICE: [
      { label: "Under ₹500", min: 0, max: 500 },
      { label: "₹500 - ₹1000", min: 500, max: 1000 },
      { label: "₹1000 - ₹1500", min: 1000, max: 1500 },
      { label: "Above ₹1500", min: 1500, max: Infinity },
    ],
    SIZES: ["XS","S","M","L","XL","XXL","3XL","4XL","5XL","6XL","7XL"],
    SEASON: [
      "Summer Collection",
      "Winter Collection",
      "Monsoon Collection",
      "Spring Collection",
      "Autumn Collection",
      "Festive Specials",
    ],
    DISCOUNT: [10, 20, 30, 50],
    OCCASION: ["Casual","Formal","Office","Party","Sports","Travel","Wedding"],
    PATTERN: ["Solid","Striped","Checked","Printed","Plain","Textured"],
  };
  