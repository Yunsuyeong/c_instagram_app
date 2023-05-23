import { gql, useQuery, useReactiveVar } from "@apollo/client";
import React, { useEffect } from "react";
import { isLoggedInVar, LogUserOut } from "../apollo";

export const Me_Query = gql`
  query me {
    me {
      id
      username
      avatar
      totalFollowing
      totalFollowers
    }
  }
`;

export default function useMe() {
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data } = useQuery(Me_Query, {
    skip: !hasToken,
  });
  useEffect(() => {
    if (data?.me === null) {
      LogUserOut();
    }
  }, [data]);
  return { data };
}
