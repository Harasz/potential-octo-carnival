-- CreateTable
CREATE TABLE "Profitable" (
    "id" VARCHAR(24) NOT NULL,
    "value" MONEY NOT NULL,

    CONSTRAINT "Profitable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OftenBought" (
    "id" VARCHAR(35) NOT NULL,
    "product_id" VARCHAR(3000) NOT NULL,
    "ordered" INTEGER NOT NULL,
    "date" DATE NOT NULL,

    CONSTRAINT "OftenBought_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profitable_id_key" ON "Profitable"("id");

-- CreateIndex
CREATE UNIQUE INDEX "OftenBought_id_key" ON "OftenBought"("id");

-- CreateIndex
CREATE INDEX "OftenBought_product_id_idx" ON "OftenBought"("product_id");
