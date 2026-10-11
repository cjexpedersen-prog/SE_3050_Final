CREATE TABLE Markets (
    MarketID INTEGER PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Street VARCHAR(150) NOT NULL,
    StreetNumber VARCHAR(20) NOT NULL,
    Zip VARCHAR(20) NOT NULL,
    City VARCHAR(100) NOT NULL,
    State VARCHAR(100),
    Country VARCHAR(100) NOT NULL,
    Phone VARCHAR(30),
    OperationHours VARCHAR(255)
);

CREATE TABLE MarketEmails (
    MarketID INTEGER NOT NULL,
    Email VARCHAR(254) NOT NULL,
    PRIMARY KEY (MarketID, Email),
    FOREIGN KEY (MarketID) REFERENCES Markets(MarketID)
);

CREATE TABLE MarketTypes (
    MarketID INTEGER NOT NULL,
    Type VARCHAR(100) NOT NULL,
    PRIMARY KEY (MarketID, Type),
    FOREIGN KEY (MarketID) REFERENCES Markets(MarketID)
);

CREATE TABLE Vendors (
    VendorID INTEGER PRIMARY KEY,
    MarketID INTEGER NOT NULL,
    Name VARCHAR(100) NOT NULL,
    Street VARCHAR(150) NOT NULL,
    StreetNumber VARCHAR(20) NOT NULL,
    Zip VARCHAR(20) NOT NULL,
    City VARCHAR(100) NOT NULL,
    State VARCHAR(100),
    Country VARCHAR(100) NOT NULL,
    Phone VARCHAR(30),
    OperationHours VARCHAR(255),
    FOREIGN KEY (MarketID) REFERENCES Markets(MarketID)
);

CREATE TABLE VendorEmails (
    VendorID INTEGER NOT NULL,
    Email VARCHAR(254) NOT NULL,
    PRIMARY KEY (VendorID, Email),
    FOREIGN KEY (VendorID) REFERENCES Vendors(VendorID)
);

CREATE TABLE Products (
    ProductID INTEGER PRIMARY KEY,
    VendorID INTEGER NOT NULL,
    Name VARCHAR(100) NOT NULL,
    Category VARCHAR(100) NOT NULL,
    Price DECIMAL(10, 2) NOT NULL CHECK (Price >= 0),
    InStockQuantity INTEGER NOT NULL DEFAULT 0 CHECK (InStockQuantity >= 0),
    FOREIGN KEY (VendorID) REFERENCES Vendors(VendorID)
);

CREATE TABLE Orders (
    OrderID INTEGER PRIMARY KEY,
    OrderDate DATE NOT NULL,
    OrderStatus VARCHAR(30) NOT NULL,
    PaymentStatus VARCHAR(30) NOT NULL,
    PaymentMethod VARCHAR(30)
);

CREATE TABLE OrderItems (
    OrderItemID INTEGER PRIMARY KEY,
    OrderID INTEGER NOT NULL,
    ProductID INTEGER NOT NULL,
    Quantity INTEGER NOT NULL CHECK (Quantity > 0),
    UnitPrice DECIMAL(10, 2) NOT NULL CHECK (UnitPrice >= 0),
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);
