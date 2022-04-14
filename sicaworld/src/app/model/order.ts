import { Orderline } from "./orderline";

export interface Order {
  orderId: string;
  orderlines: Orderline[];
  fileContent: string;
  fileName: string;
  filePath: string;
  fileType: string;
  createDate: Date;
  createBy: string;
  idolId: number;
  remarks: string;
}
