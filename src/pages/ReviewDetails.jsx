import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

const GET_REVIEW_BY_ID = gql`
  query GetReviewById($id: String!) {
    review(id: $id) {
      content
      author {
        name
        avatar
      }
      createdAt
      _id
      score
    }
  }
`;

function ReviewDetails() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_REVIEW_BY_ID, {
    variables: { id },
  });

  const params = useParams();
  return <div>ReviewDetails</div>;
}

export default ReviewDetails;
