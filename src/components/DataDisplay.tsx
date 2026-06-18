import { useFetch } from "../hooks/useFetch";

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const DataDisplay = () => {
  const { data, error, isLoading } = useFetch<Post[]>(
    "https://jsonplaceholder.typicode.com/posts",
    "GET",
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{JSON.stringify(error)}</p>;
  }
  return (
    <div>
      {data?.map((item) => {
        return (
          <div key={item.id} style={{ border: "1px solid black" }}>
            <p>User Id:{item.userId}</p>
            <p>Title:{item.title}</p>
            <p>Body:{item.body}</p>
          </div>
        );
      })}
    </div>
  );
};
