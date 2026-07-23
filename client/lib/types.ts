type AddressInfo = {
  firstName: string;
  lastName: string;
  phoneNo: string;
  email: string;
  address: string;
  apartment: string | undefined;
  city: string;
  state: string;
  zipCode: string;
};

export type UserRole = { _id: string; name: string };

export type User = {
  _id: string;
  providerId: string;
  avatar: string;
  uid: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNo: string;
  shippingInfo: AddressInfo;
  billingInfo: AddressInfo;
  role: UserRole;
};

export type Product = {
  _id: string;
  title: string;
  smallDescription: string;
  description: string;
  productImages: string[];
  price: number;
  discountPrice: number;
  categories: { _id: string; name: string; description: string }[];
  attributes: {
    attribute: { _id: string; name: string };
    selectedVariations: string[];
  }[];
  quantity: number;
  isFeatured: boolean;
  createdAt: string;
};

export type CartItemAttribute = {
  attribute: { _id: string; name: string };
  selectedVariation: string;
};

export type CartItem = {
  _id: string;
  title: string;
  productImage: string;
  price: number;
  attributes: CartItemAttribute[];
  quantity: number;
};

export type BankAccount = {
  accountHolderName: string;
  accountNumber: string;
  bankName: string;
  branchName: string;
};

export type PaymentSettings = {
  bankTransfer: {
    enabled: boolean;
    availableAccounts: BankAccount[];
  };
  cod: {
    enabled: boolean;
    title: string;
    description: string;
  };
  cardPayment: {
    enabled: boolean;
  };
  shippingFee: number;
};

export type Order = {
  products: CartItem[];
  subTotal: number;
  discountAmount: number;
  shippingCost: number;
  grandTotal: number;
  shippingInfo: AddressInfo;
  billingInfo: AddressInfo;
  paymentMethod: "cod" | "card-payment" | "bank-transfer";
  status:
    | "pending-payment"
    | "paid"
    | "processing"
    | "shipped"
    | "completed"
    | "cancelled";
};

export type FetchedOrder = {
  _id: string;
  shortId: string;
  products: {
    product: Product;
    attributes: CartItemAttribute[];
    orderQuantity: number;
    totalPrice: number;
  }[];
  subTotal: number;
  discountAmount: number;
  shippingCost: number;
  grandTotal: number;
  shippingInfo: AddressInfo;
  billingInfo: AddressInfo;
  paymentMethod: "cod" | "card-payment" | "bank-transfer";
  status:
    | "pending-payment"
    | "paid"
    | "processing"
    | "shipped"
    | "completed"
    | "cancelled";
  createdAt: string;
};

export type Category = {
  name: string;
  description: string;
};

export type Coupon = {
  _id: string;
  title: string;
  couponType: "percentage" | "exact";
  code: string;
  value: number;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateCouponData = {
  title: string;
  couponType: "percentage" | "exact";
  code: string;
  value: number;
  startDate: string;
  endDate: string;
};

export type StatisticsData = {
  totalProducts: number;
  totalCustomers: number;
  totalOrders: number;
  totalEarnings: number;
  topProducts: { product: Product; purchasedTimes: number }[];
  monthlyEarnings: { date: string; earnings: number }[];
};

// Forum/Blog types
export type ForumUser = {
  uid: number;
  username: string;
  userslug: string;
  reputation: number;
  postcount: number;
  picture: string | null;
  signature: string | null;
  banned: boolean;
  status: string;
  displayname: string;
  "icon:bgColor": string;
  "icon:text": string;
  banned_until_readable: string;
};

export type ForumCategory = {
  cid: number;
  name: string;
  slug: string;
  icon: string;
  backgroundImage: string;
  imageClass: string;
  bgColor: string;
  color: string;
  disabled: number;
};

export type BlogPost = {
  cid: number;
  lastposttime: number;
  mainPid: number;
  postcount: number;
  slug: string;
  tid: number;
  timestamp: number;
  title: string;
  uid: number;
  viewcount: number;
  postercount: number;
  deleted: number;
  locked: number;
  pinned: number;
  pinExpiry: number;
  upvotes: number;
  downvotes: number;
  deleterUid: number;
  titleRaw: string;
  timestampISO: string;
  scheduled: boolean;
  lastposttimeISO: string;
  pinExpiryISO: string;
  votes: number;
  teaserPid: number | null;
  tags: Array<{
    value: string;
    valueEscaped: string;
    valueEncoded: string;
    class: string;
  }>;
  thumbs: string[];
  category: ForumCategory;
  user: ForumUser;
  teaser: any;
  isOwner: boolean;
  ignored: boolean;
  followed: boolean;
  unread: boolean;
  bookmark: any;
  unreplied: boolean;
  icons: any[];
  index: number;
};

export type ForumApiResponse = {
  nextStart: number;
  topicCount: number;
  topics: BlogPost[];
  tids: number[];
  title: string;
  breadcrumbs: any[];
  canPost: boolean;
  showSelect: boolean;
  showTopicTools: boolean;
  allCategoriesUrl: string;
  selectedCategory: any;
  selectedCids: any[];
  selectedTag: any;
  selectedTags: any[];
  "feeds:disableRSS": number;
  rssFeedUrl: string;
  filters: any[];
  selectedFilter: any;
  terms: any[];
  selectedTerm: any;
  pagination: any;
  loggedIn: boolean;
  loggedInUser: any;
  relative_path: string;
  template: any;
  url: string;
  bodyClass: string;
  _header: any;
  widgets: any;
};
