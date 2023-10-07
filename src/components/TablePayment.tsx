'use client';
import { Grid } from 'gridjs-react';
// import "gridjs/dist/theme/mermaid.css";
import Cookies from 'js-cookie';
import { _ } from 'gridjs-react';
// @ts-ignore
import { esES } from 'gridjs/l10n';
import { BiTrash } from 'react-icons/bi';
import { HiOutlinePencil } from 'react-icons/hi';
import { FiPower } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { useAppSelector } from '@/redux/hooks';

const TableIPayments: React.FC = () => {
	let cooktoken = Cookies.get('token');
	const deleteCity = async ({ id }: { id: number }) => {
		Swal.fire({
			icon: 'info',
			title: '¿Esta seguro que quiere eliminar esta ciudad?',
			showCancelButton: true,
			confirmButtonText: 'Si',
			cancelButtonText: 'Cancelar',
		}).then(async (result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				try {
					let params = {
						method: 'DELETE',
						headers: {
							Authorization: `Bearer ${cooktoken}`,
							'Content-Type': 'application/json',
						},
					};
					await fetch(`${process.env.API_URL}/cities/${id}`, params).then(
						(response) => {
							if (!response.ok) {
								return Promise.reject('some reason');
							}
							Swal.fire('Borrado Correctamente', '', 'success');
							return response.json();
						}
					);
				} catch (error: any) {
					// Handle Create error
					console.error('Create failed:', error);
					Swal.fire({
						icon: 'error',
						title: 'Oops...',
						timer: 2000,
						text: 'Credenciales incorrectas',
					});
				}
			}
		});
	};
	const totalSteats = useAppSelector(
		(state: any) => state.seatsReserved.totalSeats,
	  );
	const dataCustomer = useAppSelector((state) => state.dataCustomer.value)
	return (
		<Grid
			columns={['NOMBRE', 'SERVICIO', 'PISO', 'N° ASIENTOS', 'TARIFA']}
			// language={esES}
			
			// server={{
			// 	method: 'GET',
			// 	headers: {
			// 		Authorization: `Bearer ${cooktoken}`,
			// 		'Content-Type': 'application/json',
			// 	},
			// 	url: `${process.env.API_URL}/companies/list/`,
			// 	then: (data: {
			// 		data: {
			// 			companies: { id_company: any; company_name: any; phone: any }[];
			// 			total: any;
			// 		};
			// 	}) =>
			// 		data.data.companies.map(
			// 			(companies: { id_company: any; company_name: any; phone: any }) => [
			// 				'PIERO VASQUEZ RIVEROS',
			// 				'Estandar',
			// 				'1',
			// 				'2',

			// 				_(<div className="text-primary font-medium">S/. 30</div>),
			// 				//     _( <div className='text-primary font-bold'>
			// 				//       <div>
			// 				//       5 libres
			// 				//       </div>
			// 				//       <div>
			// 				//       12 libres
			// 				//       </div>
			// 				//   </div> ),
			// 				//      _( <div>
			// 				//       <div>
			// 				//       Desde S/.<span className='font-bold'>75.0</span>
			// 				//       </div>
			// 				//       <div>
			// 				//       Desde S/.<span className='font-bold'>150.0</span>
			// 				//       </div>
			// 				//   </div> ),
			// 			]
			// 		),
			// 	handle: (res: any) => {
			// 		// no matching records found
			// 		if (res.status === 404) return { data: [] };
			// 		if (res.ok) return res.json();
			// 		throw Error('oh no :(');
			// 	},
			// }}
			data={
				dataCustomer.map((e:{name:any, document:any})=>{
					return  [e.name , e.document, 1, '',totalSteats*30];
				})
				// ['John', 'john@example.com'],
				// ['Mike', 'mike@gmail.com']
			  }
				
			
			resizable={true}
			// sort= {true}
			// footer = {false}
			style={{
				// table: {
				// 	width: '100%',
				// 	'border-raidus': '100px',
				// },
				// th: {
				// 	'background-color': '#e8f0fd',
				// 	color: ' var(--color-primary--)',
				// 	'font-weight': '500',
				// 	'font-size': '14px',
				// 	'text-align': 'center ',
				// 	'border-color': '#BDD7FF',
				// },
				td: {
					// padding: '10px',
					'text-align': 'center',
					// 'border-color': '#BDD7FF',
					// 'font-weight': '400',
					// 'font-size': '12px',
				},
			}}
		/>
	);
};

export default TableIPayments;
