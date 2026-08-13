export type MovingType = "포장이사" | "원룸이사" | "일반이사" | "사무실이사";

export type EstimateRequest = {
  movingType: MovingType | "";
  originSido: string;
  originDistrict: string;
  destinationSido: string;
  destinationDistrict: string;
  movingDate: string;
  options: string[];
  name: string;
  phone: string;
  memo: string;
  privacyAgreed: boolean;
};

export const initialEstimateRequest: EstimateRequest = {
  movingType: "",
  originSido: "",
  originDistrict: "",
  destinationSido: "",
  destinationDistrict: "",
  movingDate: "",
  options: [],
  name: "",
  phone: "",
  memo: "",
  privacyAgreed: false,
};

export type EstimateSubmitPayload = EstimateRequest & {
  source: "website";
  pagePath: string;
  submittedAt: string;
};
