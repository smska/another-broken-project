export interface IRawAdvice {
  title: string;
  desc: string;
}

export interface IAdvice extends IRawAdvice {
  id: number;
  createdAt: string;
  updatedAt: string;
  authorId: number;
  User?: {
    name: string;
  };
}
