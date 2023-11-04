import { Form, InputGroup } from 'react-bootstrap';
import { AiOutlineSearch } from 'react-icons/ai';

const SearchReport = ({
  target,
  filter,
  setFilter,
}: {
  target: 'user' | 'exam';
  filter: { user: string; exam: string };
  setFilter: (filter: { user: string; exam: string }) => void;
}) => (
  <InputGroup className="mb-1">
    <InputGroup.Text>
      <AiOutlineSearch />
    </InputGroup.Text>
    <Form.Control
      type="text"
      value={filter[target]}
      onChange={(e) => setFilter({ ...filter, [target]: e.target.value })}
      placeholder={`Type for search by ${target}`}
    />
  </InputGroup>
);

export default SearchReport;
