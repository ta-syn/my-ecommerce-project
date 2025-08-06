
---

### **my-ecommerce-project/docs/database-schema.md**
এই Markdown ফাইলটি আপনার MongoDB ডেটাবেসের প্রতিটি কালেকশনের (মডেলের) একটি সহজবোধ্য চিত্র তুলে ধরবে।

```markdown
# Spondonhub Database Schema

This document outlines the schema for each collection in the MongoDB database.

---

### 1. Users Collection
Stores information about registered users.

| Field       | Data Type         | Description / Constraints                               |
|-------------|-------------------|---------------------------------------------------------|
| `_id`       | `ObjectId`        | Unique identifier for the user (auto-generated).        |
| `name`      | `String`          | Required. User's full name.                             |
| `email`     | `String`          | Required, Unique. User's email address.                 |
| `password`  | `String`          | Required, Min 6 characters. Stored as a hash.           |
| `isAdmin`   | `Boolean`         | Required. `Default: false`. Identifies admin users.     |
| `createdAt` | `Date`            | Auto-generated timestamp of creation.                   |
| `updatedAt` | `Date`            | Auto-generated timestamp of last update.                |

---

### 2. Products Collection
Stores details about all products available for sale.

| Field          | Data Type           | Description / Constraints                               |
|----------------|---------------------|---------------------------------------------------------|
| `_id`          | `ObjectId`          | Unique identifier for the product (auto-generated).     |
| `user`         | `ObjectId`          | Required. Reference to the `User` who added the product.|
| `name`         | `String`            | Required. Name of the product.                          |
| `image`        | `String`            | Required. URL of the product image.                     |
| `brand`        | `String`            | Required. Brand of the product.                         |
| `category`     | `String`            | Required. Category of the product.                      |
| `description`  | `String`            | Required. Detailed description of the product.          |
| `reviews`      | `Array of Objects`  | Contains review objects (`name`, `rating`, `comment`, `user`). |
| `rating`       | `Number`            | Required. `Default: 0`. Average rating from reviews.    |
| `numReviews`   | `Number`            | Required. `Default: 0`. Total number of reviews.        |
| `price`        | `Number`            | Required. `Default: 0`. Price of the product.           |
| `countInStock` | `Number`            | Required. `Default: 0`. Number of items in stock.       |
| `createdAt`    | `Date`              | Auto-generated timestamp of creation.                   |
| `updatedAt`    | `Date`              | Auto-generated timestamp of last update.                |

---

### 3. Orders Collection
Stores information about customer orders.

| Field           | Data Type           | Description / Constraints                               |
|-----------------|---------------------|---------------------------------------------------------|
| `_id`           | `ObjectId`          | Unique identifier for the order (auto-generated).       |
| `user`          | `ObjectId`          | Required. Reference to the `User` who placed the order. |
| `orderItems`    | `Array of Objects`  | List of products in the order (`name`, `qty`, `image`, etc.). |
| `shippingAddress`| `Object`            | Customer's shipping address.                            |
| `paymentMethod` | `String`            | Required. `Default: 'Cash on Delivery'`.                |
| `paymentResult` | `Object`            | Stores details from the payment gateway (if any).       |
| `itemsPrice`    | `Number`            | Required. Total price of items before tax/shipping.     |
| `taxPrice`      | `Number`            | Required. Tax amount.                                   |
| `shippingPrice` | `Number`            | Required. Shipping cost.                                |
| `totalPrice`    | `Number`            | Required. Final total price of the order.               |
| `isPaid`        | `Boolean`           | Required. `Default: false`. Tracks payment status.      |
| `paidAt`        | `Date`              | Timestamp when the order was paid.                      |
| `isDelivered`   | `Boolean`           | Required. `Default: false`. Tracks delivery status.     |
| `deliveredAt`   | `Date`              | Timestamp when the order was delivered.                 |
| `createdAt`     | `Date`              | Auto-generated timestamp of creation.                   |
| `updatedAt`     | `Date`              | Auto-generated timestamp of last update.                |
```

---
**অভিনন্দন! 🎉**

এই ফাইলগুলো তৈরির সাথে সাথে, আপনার **Spondonhub** প্রকল্পের জন্য নির্ধারিত সম্পূর্ণ ফাইল স্ট্রাকচারের প্রতিটি অংশ এখন কোড এবং ডকুমেন্টেশন দিয়ে পূর্ণ। আপনি একটি অসাধারণ এবং পূর্ণাঙ্গ প্রকল্পের ভিত্তি স্থাপন করেছেন।