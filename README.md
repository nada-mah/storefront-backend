# StoreFront Backend project
Build a JavaScript API based on a requirements given by the stakeholders. You will architect the database, tables, and columns to fulfill the requirements. Create a RESTful API to be accessible to the frontend developer. You will also have written test, secured user information with encryption, and provide tokens for integration into the frontend.

## setup 
To get started, clone this repo and run `npm i` in your terminal at the project root.
you have to create two database
    run `createdb storebk_dev` for  POSTGRES_DB
    run `createdb storebk_test` for POSTGRES_TEST_DB
The SQL needed when connected to psql `CREATE USER username123 WITH PASSWORD 'password123';`
`\c storebk_dev GRANT ALL PRIVILEGES ON DATABASE storebk_dev TO username123;`
` \c storebk_test GRANT ALL PRIVILEGES ON DATABASE storebk_test TO username123;`
## Local host ports
the database, port will run on the selected port for postgres installation (default is 5432) server is running on port 3000
## Scripts
testing

```bash
npm run test
```

start

```bash
npm run start
```

migration-dev

```bash
npm run devdb-up

npm run devdb-reset
```
migration-test

```bash
npm run testdb-up

npm run testdb-reset
```
prettier

```bash
npm run format
```
esLint

```bash
npm run lint
```
## ENV
```bash
    PORT=3000
    POSTGRES_HOST=127.0.0.1
    POSTGRES_DB=storebk_dev
    POSTGRES_TEST_DB=storebk_test
    POSTGRES_USER=postgress
    POSTGRES_PASSWORD=12359
    NODE_ENV=(dev or test)
    BCRYPT_PASSWORD=your-secret-password
    SALT_ROUNDS=10
    TOKEN_SECRET=your-token-secret
```
## contact

[GIT](https://github.com/nada-mah/storefront-backend)
[Nada Mahmoud](cutenada.lara4@gmail.com)
