export interface VehicleAssignmentInput {
  vehicleId: number;
  routeId: number;
}

export type VehicleAssignmentStatus = "ASSIGNED" | "UNASSIGNED";
export interface UpdateVehicleAssignmentInput {
  vehicleId?: number;
  routeId?: number;
  status?: VehicleAssignmentStatus;
}

export interface VehicleAssignmentResponse {
  id: number;
  vehicleId: number;
  routeId: number;
  status: string;
}
