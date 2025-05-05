export interface BorrowMessage {
  borrowerCode: string;
  itemCode: string;
  userCode: string;
}

// type Owl = { nocturnal: true } & BirdType;
// export type NewBorrowMessage = BorrowMessage & {
//   action: 'borrow'
// }
// export type ExtendBorrowMessage = BorrowMessage & {
//   action: 'extend-borrow'
// }
//
// export interface GenericMessage {
//   messageType: string;
// }
//
//
// function createNewMessage(parameter: Omit<GenericMessage, 'messageType'>): GenericMessage {
//   return {
//     messageType: 'animal',
//     ...parameter,
//   };
// }

export interface AddItemMessage {
  itemCode: string;
  userCode: string;
}

export interface OperationResponseMessage {
  is_success: boolean;
  message: string;
  data_object: any;

}

export interface InventoryItem {
  borrow_datetime: boolean;
  borrower_code: string;
  item_code: string;
  item_description: string;
  target_return_datetime: string;
}
