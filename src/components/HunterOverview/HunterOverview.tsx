import {FC, useEffect, useState} from "react";
import {Hunter} from "../../types";
import {getAllHunters} from "../../API";
import moment from "moment";
import L from "leaflet";
export const HunterOverview: FC = () => {
	const [hunters, setHunters] = useState<Hunter[]>();

	useEffect(() => {
		getData();
	}, []);
	const getData = async () => {
		const hunters = await getAllHunters();
		setHunters(hunters);
	};
	return (
		<div className="hidden md:flex flex-col">
			<strong className="text-lg">Lijst Hunters</strong>
			<div className="text-center m-5 w-[15rem] overflow-y-auto">
				{hunters?.map((hunter) => (
					<div
						className={`${hunter.is_hunting ? 'bg-[#013220]' : 'bg-[#8B0000]'} text-white p-3 mb-5 rounded`}
					>
						<div>
							<div>{hunter.driver}</div>
						</div>
						{hunter.location_send_at &&
							<div>
								<div>Laast locatie gestuurd</div>
								<div>{
									moment(hunter.location_send_at).format("DD MMM HH:MM")}</div>
							</div>
						}
					</div>
				))}
			</div>
		</div>
	);
};
