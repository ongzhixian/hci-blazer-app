export interface BorrowMessage {
  userCode: string;
  itemCode: string;
}
export interface AddItemMessage {
  itemCode: string;
}

export interface OperationResponseMessage {
  success: boolean;
  message: string;
}

export interface InventoryItem {
  borrow_datetime: boolean;
  borrower_code: string;
  item_code: string;
  item_description: string;
  target_return_datetime: string;
}
