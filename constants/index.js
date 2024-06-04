export const rootRoleItems = [
  /// ---- Dashboard feature ----  ///
  {
    rootName: "Dashboard",
    rootItems: [
      {
        name: "Overview",
        items: [
          "View Dashboard",
          // "View total customers",
          // "View total orders",
          // "View total earnings",
          // "View total growth",
          // "View total revenue",
          // "View top selling products",
        ],
      },
    ],
  },

  /// ---- User Management feature ----  ///
  {
    rootName: "User Management",
    rootItems: [
      {
        name: "Users",
        items: ["View users", "Add user", "Delete user", "Update user"],
      },
      {
        name: "Roles",
        items: ["View roles", "Add new role", "Delete a role", "Update a role"],
      },
      {
        name: "Departments",
        items: [
          "View department",
          "Add new department",
          "Delete a department",
          "Update a department",
        ],
      },
    ],
  },

  /// ---- Contacts feature ----  ///
  {
    rootName: "Contacts",
    rootItems: [
      {
        name: "Customers",
        items: [
          "View customers",
          "Add customer",
          "Delete a customer",
          "Update a customer",
        ],
      },

      {
        name: "Suppliers",
        items: [
          "View suppliers",
          "Add new supplier",
          "Delete a supplier",
          "Update a supplier",
        ],
      },
    ],
  },

  /// ---- Products feature ----  ///
  {
    rootName: "Products",
    rootItems: [
      {
        name: "List Products",
        items: [
          "View products",
          "Add new product",
          "Update products",
          "Delete products",
        ],
      },

      {
        name: "Product Categories",
        items: [
          "View categories",
          "Add new category",
          "Update category",
          "Delete category",
        ],
      },
    ],
  },

  // Purchases feature
  {
    rootName: "Purchases",
    rootItems: [
      {
        name: "List Purchases",
        items: [
          "View purchases",
          "Add new purchase",
          "Delete a purchases",
          "Update a purchases",
        ],
      },
      {
        name: "Stock Transfer",
        items: [
          "View stock transfer",
          "Update stock transfer",
          "Add new stock transfer",
          "Delete stock transfer",
        ],
      },
    ],
  },

  //// ---- Sell / Sales feature ----  ///
  {
    rootName: "Sales",
    rootItems: [
      {
        name: "Orders",
        items: ["View orders", "Update order"],
      },
      { name: "POS", items: ["Operate POS"] },
      {
        name: "Discounts",
        items: [
          "View discount",
          "Add a discount",
          "Update discount",
          "Delete a discount",
        ],
      },
    ],
  },

  /// ---- Stocks feature ----  ///
  // {
  //   rootName: "Stocks",
  //   rootItems: [
  //     {
  //       name: "List stocks",
  //       items: [
  //         "View stocks",
  //         "Add new stock",
  //         "Delete a stock",
  //         "Update a stock",
  //       ],
  //     },
  //   ],
  // },

  // Expenses feature
  {
    rootName: "Expenses",
    rootItems: [
      {
        name: "List Expenses",
        items: [
          "View expenses",
          "Add new expense",
          "Update expense",
          "Delete expense",
        ],
      },
      {
        name: "Expense Categories",
        items: [
          "View expense category",
          "Add new expense category",
          "Update expense category",
          "Delete expense category",
        ],
      },
    ],
  },

  // Payment Accounts
  {
    rootName: "Payment Accounts",
    rootItems: [
      {
        name: "List Accounts",
        items: [
          "View accounts",
          "Add new account",
          "Delete an account",
          "Update an account",
        ],
      },
      {
        name: "Account Types",
        items: [
          "View account types",
          "Add new account type",
          "Delete an account type",
          "Update an account type",
        ],
      },
    ],
  },

  // Reports feature
  {
    rootName: "Reports",
    rootItems: [
      // {
      //   name: "Tax report",
      //   items: ["View tax report", "Profile / Loss report"],
      // },
      {
        name: "Customer report",
        items: ["View customer report"],
      },
      // {
      //   name: "Supplier report",
      //   items: ["View supplier report"],
      // },
      // {
      //   name: "Expenses report",
      //   items: ["View expenses report"],
      // },
      {
        name: "Trending products",
        items: ["View trending products"],
      },
    ],
  },

  // Settings feature
  {
    rootName: "Settings",
    rootItems: [
      {
        name: "Business Settings",
        items: ["View business settings", "Update business settings"],
      },
      {
        name: "Business Location",
        items: [
          "View business location",
          "Add new business location",
          "Delete business location",
          "Update business location",
        ],
      },
      {
        name: "Tax Rate",
        items: [
          "View tax rate",
          "Add new tax rate",
          "Delete tax rate",
          "Update tax rate",
        ],
      },
    ],
  },

  // Notification feature
  {
    rootName: "Notification templates",
    rootItems: [
      {
        name: "Text messages",
        items: ["View text message", "Update text message template"],
      },
      {
        name: "Email messages",
        items: ["View email message", "Update email message template"],
      },
    ],
  },
];

export const addNewButtonOptions = [
  "List Products",
  "List Purchases",
  "List Expenses",
];

export const kDefaultUserOptionReturn = "returnUser";
export const kDefaultUserOptionNew = "newUser";
export const kDelivery = "Delivery";
export const kPickup = "Pick up";

export const kSuccess = "Success";
export const kSameName = "Name already exist";

export const kErrorStatus = 500;
export const kSuccessStatus = 200;

export const kFirebaseError = "FirebaseError";

export const kAdminCustomerSource = "Added through admin portal";

export const AllCategories = "All Categories";

export const cediSymbol = "GH₵";
