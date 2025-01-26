-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "banner" TEXT NOT NULL,
    "dateJoined" TEXT NOT NULL,
    "acceptTerms" TEXT NOT NULL,
    "securityAnswer" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Payments" (
    "paid" BOOLEAN NOT NULL,
    "amount" REAL NOT NULL DEFAULT 0,
    "datePaid" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Payments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Note" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Note_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Payments_userId_key" ON "Payments"("userId");
