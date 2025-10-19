import Swal from 'sweetalert2';

export function SuccessAndReload(tag: string, details: string) {
	Swal.fire(tag, details, 'success').then((r) => {
		if (r.isDismissed || r.dismiss || r.isConfirmed) {
			window.location.reload();
		}
	});
}

export function ErrorAndReload(tag: string, details: string) {
	Swal.fire(tag, details, 'error').then((r) => {
		if (r.isDismissed || r.dismiss || r.isConfirmed) {
			window.location.reload();
		}
	});
}
