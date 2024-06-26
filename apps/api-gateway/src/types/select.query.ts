export interface SelectQuery {
  select?: string[];
}

export interface UserSelectQuery extends SelectQuery {
  select?: ['id', 'email', 'createdAt', 'updatedAt'];
  profileSelect?: ProfileSelectQuery | boolean;
}

export interface ProfileSelectQuery extends SelectQuery {
  select?: [
    'id',
    'dob',
    'bio',
    'userId',
    'alias',
    'avatar',
    'country',
    'gender',
  ];
}

export const extractSelectString = (select?: string[]) => {
  if (!select) return undefined;

  return select.reduce((obj, curr) => {
    obj[curr] = true;
    return obj;
  }, {});
};

export const extractUserSelect = (userSelect: UserSelectQuery) => {
  if (!userSelect.profileSelect) return extractSelectString(userSelect.select);
  return {
    ...extractSelectString(userSelect.select),
    profile:
      userSelect.profileSelect === true
        ? true
        : extractProfileSelect(userSelect.profileSelect),
  };
};

export const extractProfileSelect = (profileSelect: ProfileSelectQuery) => {
  return extractSelectString(profileSelect.select);
};
