import { UserModel }        from "./user.model.js";
import { VehicleModel }     from "./vehicle.model.js";
import { DriverModel }      from "./driver.model.js";
import { TripModel }        from "./trip.model.js";
import { MaintenanceModel } from "./maintenance.model.js";
import { FuelModel }        from "./fuel.model.js";
import { ExpenseModel }     from "./expense.model.js";

export {
  UserModel,
  VehicleModel,
  DriverModel,
  TripModel,
  MaintenanceModel,
  FuelModel,
  ExpenseModel,
};

// Run in FK-safe order: users → vehicles/drivers → trips → logs
export async function runMigrations() {
  await UserModel.createTable();
  await VehicleModel.createTable();
  await DriverModel.createTable();
  await TripModel.createTable();
  await MaintenanceModel.createTable();
  await FuelModel.createTable();
  await ExpenseModel.createTable();
  console.log("✅  All tables migrated");
}
