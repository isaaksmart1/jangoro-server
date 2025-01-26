import type { BetaList } from "@prisma/client";

import { prisma } from "~/db/db.server";

export function createBetaUser({ email }: Pick<BetaList, "email">) {
  return prisma.betaList.create({
    data: {
      email,
    },
  });
}
