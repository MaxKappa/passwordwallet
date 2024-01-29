# Password Wallet 

PasswordWallet is a secure, user-friendly web application designed for efficient password management and storage, utilizing advanced encryption for data protection.

## Features
- Secure User Authentication: Register and log in with a unique username and password.
- Encryption Key Management: Users enter a personal encryption key for data encryption/decryption, which is never stored on the server.
- Advanced Encryption: Implements AES-256-CBC encryption algorithm, a balance between speed and security, using the Forge JavaScript library.
- Data Privacy: All stored data is encrypted, ensuring it is unreadable without the user's key.
- Scalable Design: Optimized for performance, even with large volumes of encrypted data.

## Installation
```
git clone https://github.com/yourusername/PasswordWallet.git
cd PasswordWallet
npm install
```
## Usage
Start the application and register a new account.
Upon login, provide your personal encryption key.
Manage your passwords through the intuitive user interface.

## License
This project is licensed under the MIT License.
