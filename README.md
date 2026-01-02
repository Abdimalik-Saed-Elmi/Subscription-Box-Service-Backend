# Subscription Backend System

This project is a backend system for managing subscriptions, billing, orders, and inventory.

The goal of this project is to demonstrate correct backend logic, safe background processing, and a clean project structure.  
It focuses on clarity and correctness rather than unnecessary complexity.


## Tech Stack

- Runtime: Bun
- Framework: Hono.js
- Language: TypeScript
- Database: MongoDB (Mongoose)
- Background Jobs: Redis + BullMQ
- Authentication: JWT
- Password Hashing: bcrypt


## Core Features

### Authentication
- User registration and login
- Password hashing using bcrypt
- JWT-based authentication
- Role-based access control (USER, ADMIN)

### Products & Plans
- Admin users can create products
- Admin users can create subscription plans
- Products and plans are used when creating subscriptions

### Subscriptions
- Users can create subscriptions linked to a plan and product
- Each subscription has a billing cycle and status
- Subscription status updates automatically based on billing results

### Billing & Background Jobs
- A scheduler finds subscriptions that are due for billing
- Billing is processed in a background worker
- Payment success or failure is simulated
- Subscription status is updated after billing

### Orders
- Orders are created only after successful billing
- Orders are linked to users, subscriptions, and products

### Inventory
- Inventory is tracked per product and fulfillment center
- Inventory deduction is atomic to avoid race conditions
- Orders are created only when inventory is available

### Audit Logs
- Important system events are logged:
  - Payment attempts
  - Inventory deductions
  - Order creation
- Audit logs help with debugging and traceability


## Access Control

- Public routes: authentication and health checks
- Protected routes: require a valid JWT
- Admin routes: require ADMIN role

## Not Implemented Fully

The following components were not fully implemented in this project:

- Docker / Docker Compose  
 - The project includes Docker and Docker Compose configuration for local development
- CI/CD Pipeline  
- API Gateway / Reverse Proxy  
- Advanced Inventory & Fulfillment Center Logic
  - The system currently operates with a single default fulfillment center.  

These items were considered outside the scope of backend logic validation.
The project focuses on core system behavior, data flow correctness, and background processing rather than deployment or infrastructure concerns.

