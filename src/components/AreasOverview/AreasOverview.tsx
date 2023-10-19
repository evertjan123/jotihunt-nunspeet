import {FC, useEffect, useState} from "react";
import {Area, Hunt} from "../../types";
import {getAllHunters, getAllHunts, getAreas} from "../../API";
import moment, {Moment} from "moment";
export const AreasOverview: FC = () => {
	const [area, setArea] = useState<Area[]>();
	const [hunts, setHunts] = useState<Hunt[]>();
	const [counters, setCounters] = useState<any>([]);

	function getTimeDifferenceInMinutes(start: Moment) {
		const startTime = moment(start);
		const endTime = moment();

		console.log(startTime, endTime);

		const timeDifferenceInMinutes = startTime.diff(endTime, 'minutes');

		return timeDifferenceInMinutes;
	}

	useEffect(() => {
		getData()
	}, []);

	let MINUTE_MS = 40000;

	useEffect(() => {
		const interval = setInterval(() => {
			getData();
		}, MINUTE_MS);
		return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
	}, []);
	const getData = async () => {
		const areas = await getAreas();
		setArea(areas);
		const hunts = await getAllHunts();
		setHunts(hunts)
	};
	return (
		<div className="flex flex-col m-auto">

			<strong className="text-lg">Hunt verbod:</strong>
			{hunts?.map((hunt) => (
				<>
					{getTimeDifferenceInMinutes(moment(hunt.created_at).add(1, 'hours')) > 0 &&(
						<div><strong>{hunt.area?.name}</strong> verbod voor {getTimeDifferenceInMinutes(moment(hunt.created_at).add(1, 'hours'))} minuten</div>

					)}
				</>
			))}

			<strong className="text-lg">Gebieden</strong>
			<div className="flex flex-row justify-stretch w-screen md:w-max  space-x-5 m-auto overflow-x-scroll">
				{area?.map((area) => {
					let statusColor = "bg-[#FF5733]"
					if(area.status == "green") {
						statusColor = "bg-[#013220]"
					} else if(area.status == "red") {
						statusColor = "bg-[#8B0000]"
					}
					return (
					<div
						className={`${statusColor} text-white p-3 mb-5 rounded`}
					>
						<div>
							<div>{area.name}</div>
						</div>
						{area.updated_at &&
						  <div>
							<div>Laast bijgewerkt</div>
							<div>{
								moment(area.updated_at).format("HH:MM")}
							</div>
						  </div>
						}
					</div>
					)}
				)}
			</div>
		</div>
	);
};
