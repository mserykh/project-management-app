import { useParams } from 'react-router-dom';

function BoardDetailPage(): JSX.Element {
  const urlParams = useParams();
  const id = urlParams.id;
  return (
    <div>
      <h3>Board detail Page {id}</h3>
    </div>
  );
}

export default BoardDetailPage;
