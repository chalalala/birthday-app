import { Link } from "react-router-dom";

interface Props {
   icon: string,
   name: string,
   to?: string,
   currentSite: string
}

export const SidebarLink = (props: Props) => {
   const { icon, name, currentSite, to = '/' } = props;

   return (
      <Link to={to} className={`flex justify-center sidebar__link ${name === currentSite ? "active" : ""}`}>
         <span className="material-icons">{ icon }</span>
      </Link>
   )
}