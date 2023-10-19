import {FC, useEffect, useState} from "react";
import {Hunt} from "../../types";
import { getAllHunts } from "../../API";
import moment from "moment";
import {DownloadConfirmModal} from "../Modals/DownloadConfirmModal";
export const HuntsOverview: FC = () => {
	const [hunts, setHunts] = useState<Hunt[]>();
	const [isDownloadModalOpen, setIsDownloadModalOpen] = useState<boolean>(false);


	useEffect(() => {
		getData()
	}, []);

	let MINUTE_MS = 20000;

	useEffect(() => {
		const interval = setInterval(() => {
			getData();
		}, MINUTE_MS);
		return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
	}, []);
	const getData = async () => {
		const hunts = await getAllHunts();
		setHunts(hunts)
	};
	return (
		<div className="hidden md:flex flex-col">
			<strong className="text-lg">Hunts!</strong>
			<div className="text-center m-5 w-[15rem] overflow-y-auto">
				{hunts?.slice(0, 7).map((hunt) => {
					let statusColor = "bg-joti"
					if (moment().diff(moment(hunt.created_at), 'minutes') < 5) {
						statusColor = "bg-[#013220]"
					}
					return (
						<div
							className={`${statusColor} text-white p-3 mb-5 rounded`}
						>
							<div>
								<div>{hunt.area?.name}</div>
							</div>
							<div className="m-2">
								<div>Code:</div>
								<div>{hunt.code}</div>
							</div>
							<div className="m-2">
								<div>Tijd:</div>
								<div>{hunt.time}</div>
							</div>
							<hr/>
							<div className="flex flex-row text-center">
								<div>Gehunt door: </div>
								<div> {hunt.hunter?.driver}</div>
							</div>
							{hunt.path_to_photo && (
								<>
								<hr/>
									<button
										className="text-white bg-gray font-medium rounded-lg text-sm px-5 py-2.5 mt-2 text-center"
										onClick={() => setIsDownloadModalOpen(true)}
									>
										Download foto
									</button>
									<DownloadConfirmModal
										isOpen={isDownloadModalOpen}
										onClose={() => setIsDownloadModalOpen(false)}
										huntID={hunt.id!}
										/>
								</>

							)}

						</div>
					)
				})}
			</div>
		</div>
);
};
