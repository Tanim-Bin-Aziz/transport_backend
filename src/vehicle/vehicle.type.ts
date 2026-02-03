export type VehicleStatus = "ACTIVE" | "INACTIVE";

export type CreateVehicleInput = {
  vehicleNumber: string;
  driverName: string;
  helperName?: string | undefined;
  contactNumber: string;
  status?: VehicleStatus | undefined;
};

export type UpdateVehicleInput = {
  vehicleNumber?: string | undefined;
  driverName?: string | undefined;
  helperName?: string | undefined;
  contactNumber?: string | undefined;
  status?: VehicleStatus | undefined;
};
