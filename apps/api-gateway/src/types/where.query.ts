export interface WhereQuery {}

export interface UserWhereQuery extends WhereQuery {
  id: string;
  email: string | { contains: string };
}

export interface ProfileWhereQuery extends WhereQuery {}
