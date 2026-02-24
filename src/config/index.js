export const categoryTree = [
  {
    id: "electronics",
    name: "Electronics",
    children: [
      {
        id: "computers",
        name: "Computers",
        children: [
          { id: "laptops", name: "Laptops" },
          { id: "desktops", name: "Desktops" },
          {
            id: "components",
            name: "Components",
            children: [
              { id: "processors", name: "Processors" },
              { id: "graphics-cards", name: "Graphics Cards" },
              { id: "memory", name: "Memory" },
            ],
          },
        ],
      },
      {
        id: "phones",
        name: "Phones & Tablets",
        children: [
          { id: "smartphones", name: "Smartphones" },
          { id: "tablets", name: "Tablets" },
          { id: "accessories", name: "Accessories" },
        ],
      },
    ],
  },
  {
    id: "clothing",
    name: "Clothing",
    children: [
      { id: "mens", name: "Men's Clothing" },
      { id: "womens", name: "Women's Clothing" },
      {
        id: "accessories",
        name: "Accessories",
        children: [
          { id: "watches", name: "Watches" },
          { id: "bags", name: "Bags" },
          { id: "jewelry", name: "Jewelry" },
        ],
      },
    ],
  },
];

export const groupByProducts = [
  {
    id: 100,
    name: "Shirts",
    category: "Shirts",
    price: 1000,
    brand: "Brand A",
  },
  {
    id: 1,
    name: "Laptop",
    category: "Electronics",
    price: 1000,
    brand: "Brand A",
  },
  {
    id: 2,
    name: "Smartphone",
    category: "Electronics",
    price: 500,
    brand: "Brand B",
  },
  { id: 3, name: "Shirt", category: "Clothing", price: 30, brand: "Brand C" },
  { id: 4, name: "Pants", category: "Clothing", price: 40, brand: "Brand C" },
  {
    id: 5,
    name: "Washing Machine",
    category: "Home Appliances",
    price: 300,
    brand: "Brand A",
  },
  {
    id: 6,
    name: "Microwave",
    category: "Home Appliances",
    price: 150,
    brand: "Brand B",
  },
];

export const nestedObjectTest = {
  user: {
    id: 123,
    name: "Alice",
    contact: {
      email: "alice@example.com",
      phones: ["123-456-7890", "987-654-3210"],
    },
    preferences: {
      notifications: {
        email: true,
        sms: false,
      },
      theme: "dark",
    },
  },
  posts: [
    {
      id: 1,
      title: "First Post",
      tags: ["intro", "hello"],
      comments: [
        {
          userId: 456,
          comment: "Nice post!",
          timestamp: "2024-01-01T10:00:00Z",
        },
        {
          userId: 789,
          comment: "Thanks for sharing.",
          timestamp: "2024-01-02T15:30:00Z",
        },
      ],
    },
    {
      id: 2,
      title: "Another Post",
      tags: [],
      comments: [],
    },
  ],
  metadata: {
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2025-04-19T12:34:56Z",
    flags: {
      archived: false,
      featured: true,
    },
  },
};

export const horizontalMenuItems = [
  "All",
  "Music",
  "Live",
  "Gaming",
  "React JS",
  "Programming",
  "Podcasts",
  "Algorithms",
  "Computer Science",
  "User Interface",
  "Machine Learning",
  "Recently Uploaded",
  "New to You",
  "Watched",
];

export const nestedSearchData = [
  {
    id: "electronics",
    name: "Electronics",
    children: [
      {
        id: "computers",
        name: "Computers",
        children: [
          { id: "laptops", name: "Laptops", brand: "Dell" },
          { id: "desktops", name: "Desktops", brand: "HP" },
          {
            id: "accessories",
            name: "Accessories",
            children: [
              { id: "mice", name: "Mice", brand: "Logitech" },
              { id: "keyboard", name: "Keyboards", brand: "Corsair" },
            ],
          },
        ],
      },
      {
        id: "phones",
        name: "Phones & Tablets",
        children: [
          { id: "smartphones", name: "Smartphones", brand: "Apple" },
          { id: "tablets", name: "Tablets", brand: "Samsung" },
        ],
      },
    ],
  },
  {
    id: "clothing",
    name: "Clothing",
    children: [
      { id: "mens", name: "Men's Clothing" },
      {
        id: "womens",
        name: "Women's Clothing",
        children: [
          { id: "dresses", name: "Dresses" },
          { id: "accessories", name: "Accessories" },
          { id: "sangam", name: "sangam" },
        ],
      },
    ],
  },
];

export const dynamicFormSchema = {
  title: "User Registration",
  fields: [
    {
      id: "name",
      label: "Full Name",
      type: "text",
      componentType: "input",
      placeholder: "Enter your full name",
      required: true,
    },
    {
      id: "email",
      label: "Email Address",
      type: "email",
      componentType: "input",
      placeholder: "Enter your email",
      required: true,
    },
    {
      id: "age",
      label: "Age",
      type: "number",
      componentType: "input",
      placeholder: "Enter your age",
    },
    {
      id: "role",
      label: "Role",
      componentType: "select",
      options: [
        { value: "developer", label: "Developer" },
        { value: "designer", label: "Designer" },
        { value: "manager", label: "Manager" },
        { value: "other", label: "Other" },
      ],
      defaultValue: "developer",
    },
    {
      id: "bio",
      label: "Bio",
      componentType: "textarea",
      placeholder: "Tell us about yourself",
    },
    {
      id: "terms",
      label: "I agree to the terms and conditions",
      componentType: "checkbox",
      required: true,
    },
  ],
};

export const fileExplorerSystemData = [
  {
    id: "1",
    name: "src",
    type: "folder",
    children: [
      {
        id: "2",
        name: "components",
        type: "folder",
        children: [
          {
            id: "3",
            name: "Button.tsx",
            type: "folder",
            children: [{ id: "40", name: "Card.tsx", type: "file" }],
          },
          { id: "4", name: "Card.tsx", type: "file" },
          { id: "5", name: "Input.tsx", type: "file" },
        ],
      },
      {
        id: "6",
        name: "pages",
        type: "folder",
        children: [
          { id: "7", name: "index.tsx", type: "file" },
          { id: "8", name: "about.tsx", type: "file" },
          {
            id: "9",
            name: "blog",
            type: "folder",
            children: [
              { id: "10", name: "index.tsx", type: "file" },
              { id: "11", name: "[slug].tsx", type: "file" },
            ],
          },
        ],
      },
      { id: "12", name: "App.tsx", type: "file" },
      { id: "13", name: "main.tsx", type: "file" },
    ],
  },
  {
    id: "14",
    name: "public",
    type: "folder",
    children: [
      { id: "15", name: "favicon.ico", type: "file" },
      { id: "16", name: "robots.txt", type: "file" },
    ],
  },
  { id: "17", name: "package.json", type: "file" },
  { id: "18", name: "tsconfig.json", type: "file" },
  { id: "19", name: "new.json", type: "file" },
];
