import { useNavigate } from "react-router-dom";

export default function GroupCard({ group }) {
    const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/group/${group.id}`)} className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow duration-300">
        {group.name}
    </div>
  );
}