export type PickupStatus = "ACTIVE" | "INACTIVE";

export type CreatePickupInput = {
  name: string;
  location: string;
  status: string;
};

export type UpdatePickupInput = {
  name?: string | undefined;
  location?: string | undefined;
  status?: string;
};
