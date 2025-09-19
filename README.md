# Secure-Pay – Reversible Crypto Payments for the Somnia Ecosystem

## Overview

Secure-Pay is a next-generation reversible crypto payment platform built natively for the Somnia ecosystem, designed to revolutionize how users send and receive cryptocurrency using simple usernames instead of complex wallet addresses.

From a single, intuitive dashboard, users can send crypto payments using usernames with customizable expiration times, claim payments before they expire, automatically refund unclaimed payments, and track all transaction history with complete on-chain transparency. Every payment is secured by smart contract escrow logic, ensuring funds are protected until claimed or automatically returned to the sender.

With Secure-Pay, crypto payments aren't just faster and cheaper—they're user-friendly, reversible, and built for the next generation of decentralized commerce where anyone can send crypto using simple usernames.

## Resources

| Resource | Resource Link |
|----------|---------------|
| GitHub Repository | 🔗 [View on GitHub](https://github.com/preyanshu/aecure-Pay) |
| Live Demo | 🔗 [Open Secure-Pay](https://your-demo-url.com) |
| Demo Video | 🔗 [Watch on YouTube](https://youtube.com/watch?v=your-video) |
| SomniaScan – Escrow Contract | 🔗 [Contract Address](https://somnia.xyz/address/your-contract-address) |
| Architecture Diagram | 🔗 [View Architecture](https://your-architecture-diagram.com) |

## The Problems in Web3 Payments Today

- **Complex wallet addresses** make sending crypto confusing and error-prone
- **No way to reverse payments** if sent to wrong address or unclaimed
- **Poor user experience** with long, complex wallet addresses
- **No time-bound security** for payments
- **High gas fees** from complex payment systems
- **No automatic refunds** for unclaimed payments

## Secure-Pay's Solution

- **Username-Based Payments** – Send crypto using simple usernames instead of wallet addresses
- **Reversible Payments** – Payments automatically refund if not claimed within expiration time
- **Time-Bound Security** – Customizable expiration times (0.1-168 hours)
- **Smart Contract Escrow** – Funds secured until claimed or refunded
- **On-Chain Transparency** – All payments verifiable on SomniaScan
- **User-Friendly Interface** – Intuitive design for seamless experience
- **Cross-Border, Bank-Free** – Instant blockchain settlement worldwide

## Why Secure-Pay Stands Out from Other Web3 Payment Solutions

### Full Escrow Support
We're not just payments—we handle the entire escrow lifecycle, including deposits, claims, refunds, and expiration management, all on-chain.

### Time-Bound Security
Using smart contract logic, payments automatically expire and refund if not claimed within the specified timeframe, preventing lost funds.

### Smart Contract Architecture
Every payment is secured by our deployed escrow smart contract, ensuring funds are protected and transactions are transparent.

### Two-Way Communication
Automated notifications ensure users always know when payments are created, claimed, or expired—unlike most tools that rely only on blockchain explorers.

### Integrated User Portal
Other tools focus only on basic transfers—Secure-Pay gives users their own secure space to track payments, manage escrows, and view transaction history.

## Key Features

### For Senders
- **Create Escrow Payments** – Send funds with customizable expiration times
- **Recipient Selection** – Choose from registered users or enter wallet addresses
- **Payment Tracking** – Monitor payment status and expiration in real-time
- **Automatic Refunds** – Unclaimed payments automatically return after expiry

### For Receivers
- **Payment Dashboard** – View all incoming escrow payments
- **One-Click Claims** – Instantly claim payments before expiration
- **Status Filtering** – Filter payments by status (pending, completed, expired)
- **Real-Time Updates** – Live countdown timers for payment expiration

### Smart Contract Features
- **Escrow Logic** – Funds held securely until claimed or expired
- **Automatic Refunds** – Senders can reclaim funds after expiration
- **Time Validation** – Prevents invalid expiration timestamps
- **Gas Optimization** – Efficient contract design for minimal gas costs

## Technical Architecture

### Frontend
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for modern UI/UX
- **Wagmi & Viem** for blockchain interactions
- **RainbowKit** for wallet connections

### Backend
- **Next.js API Routes** for serverless functions
- **MongoDB** with Mongoose for data persistence
- **RESTful APIs** for payment and user management

### Smart Contracts
- **Solidity 0.8.20** for contract development
- **Escrow Pattern** for secure fund management
- **Time-based Logic** for automatic refunds
- **Gas-optimized** for Somnia's low-fee environment

### Blockchain Integration
- **Somnia Testnet** for development and testing
- **EVM Compatibility** for seamless integration
- **Real-time Transaction Monitoring** for payment status updates

## Smart Contract Details

### EscrowPayments Contract
```solidity
contract EscrowPayments {
    struct Payment {
        uint256 amount;
        uint256 expiry;      // deadline for receiver to withdraw
        bool withdrawn;      // true if receiver has withdrawn
    }

    // Core functions:
    // - depositFor(address receiver, uint256 expiryTimestamp)
    // - withdrawFrom(address sender)
    // - refund(address receiver)
    // - viewPayment(address sender, address receiver)
}
```

### Key Features
- **Deposit Funds** with custom expiration timestamps
- **Withdraw Payments** before expiration (receiver only)
- **Refund Payments** after expiration (sender only)
- **View Payment Details** for transparency
- **Gas-Efficient** design for Somnia's high TPS

## Value to the Somnia Ecosystem

Secure-Pay is a flagship utility dApp that amplifies Somnia's strengths and drives ecosystem growth.

### 1. Showcasing Somnia's Low-Fee, High-Speed Network
Escrow payments and automatic refunds become near-instant and cost-effective, demonstrating Somnia's scalable Layer 1 design for high-volume transactions.

### 2. Driving On-Chain Activity
Every payment, claim, and refund increases Somnia's daily active users and transaction count, boosting network health metrics that attract developers and investors.

### 3. Expanding Use Cases Beyond DeFi
Secure-Pay introduces escrow payments, secure commerce, and trustless transactions as new categories, broadening Somnia's ecosystem diversity and showcasing its versatility.

### 4. Attracting Users to Somnia
Individuals and businesses using Secure-Pay naturally onboard onto Somnia, expanding the user base organically through payment adoption.

### 5. Future Integrations that Strengthen Somnia's Position
Our roadmap includes AI-powered payment optimization, multi-token support, and advanced escrow features—all built natively on Somnia, cementing it as the go-to chain for Web3 payment infrastructure.

## Future Roadmap for Somnia

### Phase 1: Enhanced Features
- **Multi-Token Support** – Support for various ERC-20 tokens
- **Batch Payments** – Send multiple escrow payments in one transaction
- **Payment Templates** – Save common payment configurations

### Phase 2: Advanced Functionality
- **AI Payment Optimization** – Automatically suggest optimal expiration times
- **Payment Analytics** – Detailed insights into payment patterns
- **Integration APIs** – Allow third-party apps to integrate escrow payments

### Phase 3: Enterprise Features
- **Multi-Signature Escrows** – Require multiple approvals for large payments
- **Conditional Payments** – Release funds based on external conditions
- **Compliance Tools** – Generate reports for regulatory requirements

## Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB database
- Somnia testnet wallet with test tokens

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Secure-Pay.git
   cd Secure-Pay
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Fill in your environment variables:
   - `MONGODB_URI` - Your MongoDB connection string
   - `NEXT_PUBLIC_PROJECT_ID` - Your WalletConnect project ID

4. **Deploy the smart contract**
   ```bash
   # Deploy to Somnia testnet
   npx hardhat run scripts/deploy.js --network somnia-testnet
   ```

5. **Update contract address**
   Update the contract address in `lib/contract.js`

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to `http://localhost:3000`

### Usage

1. **Connect Wallet** – Connect your Somnia testnet wallet
2. **Register** – Create your user profile
3. **Send Payment** – Create an escrow payment with expiration time
4. **Receive Payment** – Claim incoming payments before they expire
5. **Track Status** – Monitor all your payment activities

## Contract Addresses

| Network | Contract Address | Explorer |
|---------|------------------|----------|
| Somnia Testnet | `0x...` | [View on SomniaScan](https://somnia.xyz/address/0x...) |

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Team

- **Developer**: [Your Name](https://github.com/yourusername)
- **Contact**: [your.email@example.com](mailto:your.email@example.com)

## Acknowledgments

- Somnia team for the amazing blockchain infrastructure
- OpenZeppelin for smart contract security patterns
- The Web3 community for inspiration and support

## Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Join our Discord community
- Contact us at [support@securepay.com](mailto:support@securepay.com)

---

**Built with ❤️ for the Somnia Ecosystem**

*Secure-Pay: Where payments meet security, transparency, and trust.*
