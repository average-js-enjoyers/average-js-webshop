module.exports = [
  {
    _id: "614ce88d8101e980a49f0427",
    emailAddress: "user1@example.com",
    phoneNumber: 1234567890,
    password: "Password123",
    firstName: "John",
    lastName: "Doe",
    registrationDate: "2023-10-23T00:00:00Z",
    role: "user",
    twoFactorEnabled: true,
    active: true,
    addresses: [
      "614ce88d8101e980a49f0427", // Reference the address ID
    ],
  },
  {
    _id: "614ce88d8101e980a49f0428",
    emailAddress: "user2@example.com",
    phoneNumber: 9876543210,
    password: "Securepass123",
    firstName: "Alice",
    lastName: "Smith",
    registrationDate: "2023-10-23T00:00:00Z",
    role: "user",
    twoFactorEnabled: false,
    active: true,
    addresses: [
      "614ce88d8101e980a49f0428", // Reference the address ID
    ],
  },
  {
    _id: "614ce88d8101e980a49f0429",
    emailAddress: "admin@example.com",
    phoneNumber: 5555555555,
    password: "Admin123",
    firstName: "Admin",
    lastName: "User",
    registrationDate: "2023-10-23T00:00:00Z",
    role: "admin",
    twoFactorEnabled: true,
    active: true,
    addresses: [
      "614ce88d8101e980a49f0429", // Reference the address ID
    ],
  },
  {
    _id: "614ce88d8101e980a49f0430",
    emailAddress: "jane@example.com",
    phoneNumber: 9998887777,
    password: "Janepassword123",
    firstName: "Jane",
    lastName: "Johnson",
    registrationDate: "2023-10-23T00:00:00Z",
    role: "user",
    twoFactorEnabled: true,
    active: true,
    addresses: [
      "614ce88d8101e980a49f0430", // Reference the address ID
    ],
  },
  {
    _id: "614ce88d8101e980a49f0431",
    emailAddress: "inactive@example.com",
    phoneNumber: 1112223333,
    password: "Inactivepass123",
    firstName: "Inactive",
    lastName: "User",
    registrationDate: "2023-10-23T00:00:00Z",
    role: "user",
    twoFactorEnabled: false,
    active: false,
    addresses: [
      "614ce88d8101e980a49f0431", // Reference the address ID
    ],
  },
];
