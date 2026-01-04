# Security Guidelines

## ⚠️ Important: Never Commit Credentials

This repository should **NEVER** contain:
- Real MongoDB connection strings
- Actual passwords
- JWT secrets
- API keys
- Any sensitive credentials

## ✅ Safe Files

These files are safe to commit as they only contain placeholders:
- `backend/ENV_TEMPLATE.txt` - Template with placeholders only
- `frontend/.env.example` - Example file with placeholders
- `README.md` - Documentation with generic examples

## 🔒 Protected Files

These files are in `.gitignore` and should NEVER be committed:
- `backend/.env` - Contains actual credentials
- `frontend/.env` - Contains actual API URLs and secrets
- Any file with `.env` in the name

## 🚨 If You Accidentally Committed Credentials

1. **Immediately rotate/change all exposed credentials:**
   - Change MongoDB Atlas password
   - Generate new JWT_SECRET
   - Update admin credentials

2. **Remove from Git history:**
   ```bash
   # Remove file from history (use with caution)
   git filter-branch --force --index-filter \
     "git rm --cached --ignore-unmatch backend/.env" \
     --prune-empty --tag-name-filter cat -- --all
   ```

3. **Force push (coordinate with team):**
   ```bash
   git push origin --force --all
   ```

4. **Update GitHub secrets scanner:**
   - Go to repository settings
   - Security → Secret scanning
   - Review and resolve alerts

## 📝 Best Practices

1. **Always use templates:**
   - Copy `ENV_TEMPLATE.txt` to `.env`
   - Fill in your actual values locally
   - Never commit `.env` files

2. **Use environment variables:**
   - Store secrets in environment variables
   - Use `.env` files for local development
   - Use platform secrets for production (Vercel, Railway, etc.)

3. **Review before committing:**
   - Check `git diff` before committing
   - Look for connection strings, passwords, keys
   - Use `git secrets` or similar tools

4. **Use placeholder format:**
   - `MONGODB_URI=your-mongodb-connection-string-here`
   - `JWT_SECRET=your-secret-here`
   - `ADMIN_PASSWORD=your-password-here`

## 🔍 Checking for Exposed Secrets

Before committing, search for:
```bash
# Search for potential secrets (connection strings should not be in code)
grep -r "MONGODB_URI" --exclude-dir=node_modules --exclude=".env"
grep -r "password.*=" --exclude-dir=node_modules --exclude=".env"
grep -r "secret.*=" --exclude-dir=node_modules --exclude=".env"
```

## 📚 Resources

- [GitHub Secret Scanning](https://docs.github.com/en/code-security/secret-scanning)
- [OWASP Secrets Management](https://owasp.org/www-community/vulnerabilities/Use_of_hard-coded_cryptographic_key)
- [12 Factor App - Config](https://12factor.net/config)

