let currentStep = 0;
let currentPersonalInfoStep = 0;
let leadId = null;
let allFormData = new FormData();
let selectedDay = "";
let selectedDate = "";
let selectedTime = "";
let planType = "";
const IS_DEV = false;
const LOCALHOST_URL = 'http://localhost:8000'
const LIVE_URL = 'https://app.aionsolution.com.br'
const API_URL = IS_DEV ? LOCALHOST_URL : LIVE_URL

const planHumanizedName = {
	'software': 'Software',
	'consulting': 'Consultoria',
	'acceleration': 'Software + Plano de Aceleração',
}

const sectorToSegmentMapping = {
	"Moda e acessórios": "Varejo",
	"Beleza e perfumaria": "Varejo",
	"Farmácia": "Varejo",
	"Pet": "Varejo",
	"Alimentos e bebidas": "Varejo",
	"Jóias e óticas": "Varejo",
	"Móveis, casa e decoração": "Varejo",
	"Eletro-eletrônicos": "Varejo",
	"Games e tecnologia": "Varejo",
	"Computadores e internet": "Varejo",
	"Livrarias e papelarias": "Varejo",
	"Brinquedos e jogos": "Varejo",
	"Equipamentos médicos": "Varejo",
	"Veículos e peças": "Varejo",
	"Produtos sustentáveis": "Varejo",
	"Lojas de conveniência": "Varejo",
	"Ferragens": "Varejo",
	"Imóveis e construção": "Varejo",
	"Artigos Infantis": "Varejo",
	"Casa e Móveis": "Varejo",
	"Saúde e Suplementação": "Varejo",
	"Saúde e medicina": "Serviços",
	"Estética": "Serviços",
	"Odontologia": "Serviços",
	"Academias e fitness": "Serviços",
	"Eventos e entretenimento": "Serviços",
	"Turismo e hotelaria": "Serviços",
	"Consultorias e treinamentos": "Serviços",
	"Serviços de manutenção": "Serviços",
	"Arquitetura, Urbanismo e Design de Interiores": "Serviços",
	"Marketing, Propaganda e comunicação": "Serviços",
	"ONGs, Clubes e associações": "Serviços",
	"Bares e restaurantes": "Serviços",
	"Delivery e Logística": "Serviços",
	"Higiene e limpeza": "Serviços",
	"Segurança": "Serviços",
	"Financeiro": "Serviços",
	"Contábil": "Serviços",
	"Jurídico": "Serviços",
	"Tecnologia": "Serviços",
	"Indústria têxtil": "Indústria",
	"Indústria alimentícia": "Indústria",
	"Indústria química": "Indústria",
	"Metalurgia e siderurgia": "Indústria",
	"Indústria de embalagens": "Indústria",
	"Agronegócio": "Indústria",
	"Máquinas e equipamentos": "Indústria",
	"Energia elétrica": "Indústria",
	"Comunicação e telecomunicação": "Indústria",
	"Embalagens": "Indústria",
	"Outros": "Outros",
};

function disableButton(field) {
	const button = document.getElementById(`send-${field}`);
	const originalText = button.value;
	button.disabled = true;
	button.value = "...";
	return originalText
}

function enableButton(field, buttonText) {
	const button = document.getElementById(`send-${field}`);
	button.disabled = false;
	button.value = buttonText;
}

function updateLead() {
	setAllFormData()

	return fetch(`${API_URL}/api/kommo/${leadId}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
		},
		body: allFormData,
	})
}

function sendLead() {
	setAllFormData()

	return fetch(`${API_URL}/api/kommo`, {
		method: "POST",
		headers: {
			Accept: "application/json",
		},
		body: allFormData,
	}).then((data) => {
		return data.json().then((e) => leadId = e.id)
	});
}

function setAllFormData() {

	const allFormInputs = document.querySelectorAll('.personal-info-form')
	allFormInputs.forEach(formDataElement => {
		let formData = new FormData(formDataElement);
		for (const [key, value] of Object.entries(Object.fromEntries(formData))) {
			if (key === 'CNPJ')
				allFormData.set(key, value.replace(/[^\d]+/g, ""));
			else
				allFormData.set(key, value);
		}
	})

	allFormData.set("origin_id", "Landing de Consultoria");
	if (!planType || planType === 'unknown') {
		allFormData.set("PLAN", "");
		allFormData.set("INVOICING", "");
	} else
		allFormData.set("PLAN", planHumanizedName[planType]);

	const erpSelected = document.querySelector('input[name="ERP"]:checked');
	if (erpSelected && erpSelected.value === 'other') {
		const erpOther = document.getElementById("erp-other")
		allFormData.ERP = erpOther.value
	}
	else {
		allFormData.set("ERP", '')
	}

	const savedParams = sessionStorage.getItem('utmParams');

	let channel = 'Site'

	if (savedParams) {
		const paramsURL = new URLSearchParams(savedParams);


		if (paramsURL.get('utm_source') == 'google-ads') {
			channel = 'Google Ads'
		} else if (paramsURL.get('gad_source')) {
			channel = 'Google Ads'
		}
		else if (paramsURL.get('utm_source') == 'meta-ads') {
			channel = 'Meta Ads'
		}
		allFormData.set('CHANNEL', channel);
		allFormData.set('UTM_SOURCE', paramsURL.get('utm_source') ?? '');
		allFormData.set('UTM_MEDIUM', paramsURL.get('utm_medium') ?? '');
		allFormData.set('UTM_CAMPAIGN', paramsURL.get('utm_campaign') ?? '');
		allFormData.set('UTM_CONTENT', paramsURL.get('utm_content') ?? '');
		allFormData.set('UTM_TERM', paramsURL.get('utm_term') ?? '');
	}


}

function getWhatsAppContact(event) {

	event.preventDefault();

	setAllFormData()

	pagbankCheckoutDict = {}
	for (const [key, value] of Object.entries(Object.fromEntries(allFormData))) {
		pagbankCheckoutDict[key] = value;
	}

	// Credit card checkout *will be used later*

	// const erpSelected = document.querySelector('input[name="ERP"]:checked').value;
	// allFormData.set('ERP', erpSelected);
	// if(planType === 'software' || (planType === 'acceleration' && erpSelected !== 'other')){
	// 	for (const [key, value] of Object.entries(Object.fromEntries(allFormData))) {
	// 		localStorage.setItem(key, value);
	// 	}
	// 	 window.location.href = `checkout.html?type=${planType}`;
	// }else{
	// 	const personalContent = document.getElementById("send-personal-content");

	// 	personalContent.style.opacity = 1;
	// 	setTimeout(() => {
	// 		personalContent.style.opacity = 0;
	// 		personalContent.style.display = "none";
	// 	});

	// 	const chooseSchedule = document.getElementById("send-whatsapp-message");
	// 	chooseSchedule.style.display = "block";
	// 	setTimeout(() => {
	// 		chooseSchedule.style.opacity = 1;
	// 	});
	// }
	const checkoutTitle = document.getElementById("checkout-title")
	const checkoutDecription = document.getElementById("checkout-description")
	const whatsappContactButton = document.getElementById("whatsapp-contact-button")
	const pagbankCheckoutButton = document.getElementById("pagbank-checkout")
	if (planType === 'software') {
		const pagbankCheckoutPayload = {
			"company": pagbankCheckoutDict['COMPANY'],
			"email": pagbankCheckoutDict['EMAIL'],
			"erp": pagbankCheckoutDict['ERP'],
			"cnpj": pagbankCheckoutDict['CNPJ'],
			"name": pagbankCheckoutDict['FNAME'],
			"phone": pagbankCheckoutDict['PHONE'],
			"invoicing": pagbankCheckoutDict['INVOICING'],
			"website_url": pagbankCheckoutDict['WEBSITE'],
			"segment": pagbankCheckoutDict['SEGMENT'],
			"sales_channel": pagbankCheckoutDict['CHANNEL'],
			"sector": sectorToSegmentMapping[pagbankCheckoutDict['SEGMENT']],
			'is_from_lp': true
		}

		const url = `${API_URL}/api/create_new_subscription`
		fetch(url, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				Accept: "application/json",
			},
			body: JSON.stringify(pagbankCheckoutPayload)
		})

		whatsappContactButton.style.display = 'none'
		pagbankCheckoutButton.style.display = 'block'
		checkoutTitle.innerHTML = `<p>Agradecemos seu pré-cadastro!</p>`
		checkoutDecription.innerHTML = `
			O próximo passo é preencher seus dados de pagamento, caso tenha interesse em testar o Aion a custo zero.
			<br><br>Reforçamos que não cobraremos nada durante seu período de teste de 30 dias. Caso você goste, após esse período, a cobrança de R$ 1.999 mensais (recorrentes todo mês) será realizada no 31º dia. Você poderá cancelar essa cobrança a qualquer momento.
			<br><br>Fique tranquilo! Todos os dados são criptografados e administrados pela operadora PagBank, que segue à risca as exigências da LGPD.
			<br><br><h3>*Certifique-se de usar na plataforma PagBank o mesmo e-mail (${pagbankCheckoutDict['EMAIL']}) informado no formulário que você acabou de preencher.</h3>
		`
	} else {
		whatsappContactButton.style.display = 'flex'
		pagbankCheckoutButton.style.display = 'none'
		checkoutTitle.innerHTML = `<p>Agradecemos seu interesse!</p>`
		checkoutDecription.innerHTML = `
			Iremos entrar em contato com você! Mas se preferir, nos mande uma mensagem. Um de nossos colaboradores irá responder o mais rápido possível.
		`
	}

	const personalContent = document.getElementById("send-personal-content");

	personalContent.style.opacity = 1;
	setTimeout(() => {
		personalContent.style.opacity = 0;
		personalContent.style.display = "none";
	});

	const chooseSchedule = document.getElementById("send-whatsapp-message");
	chooseSchedule.style.display = "block";
	setTimeout(() => {
		chooseSchedule.style.opacity = 1;
	});
}

function getWhatsAppMessage(event) {
	const whatsappContactButton = document.getElementById("whatsapp-contact-button")

	const formValues = Object.fromEntries(allFormData)
	let messageSufix = "pela AION!"
	if (planType === 'consulting') {
		messageSufix = "pela consultoria da AION!"
	} else if (planType === 'software') {
		messageSufix = "pelo software da AION!"
	} else if (planType === 'acceleration') {
		messageSufix = "pelo software e plano de aceleração da AION!"
	}

	const message = `Olá! Meu nome é ${formValues['FNAME']}, sou da empresa ${formValues['COMPANY']} do segmento de ${formValues['SEGMENT']} e me interessei ${messageSufix}`
	const encodedMessage = encodeURI(message);
	whatsappContactButton.setAttribute("href", `https://wa.me/5511965833332?text=${encodedMessage}`)
	event && event.preventDefault && event.preventDefault();
	return false;
}

function getNextQuestion(event) {
	event.preventDefault();

	if (currentPersonalInfoStep < 10) {
		let nextStep = currentPersonalInfoStep + 1
		let fieldsToIgnore = []
		if (planType === 'unknown')
			fieldsToIgnore = [5, 7, 9]
		while (1) {
			if (!fieldsToIgnore.includes(nextStep))
				break
			nextStep++
		}
		const form = document.getElementById(
			`personal-info-form-${nextStep}`
		);
		form.style.opacity = 1;

		formDataElement = document.getElementById(
			`personal-info-form-${currentPersonalInfoStep}`
		);

		let formData = new FormData(formDataElement);
		for (const [key, value] of Object.entries(Object.fromEntries(formData))) {
			allFormData.set(key, value);
		}
		let inputToFocus;
		if (currentPersonalInfoStep === 2)
			inputToFocus = document.getElementById(`email`);
		else if (currentPersonalInfoStep < 6)
			inputToFocus = document.getElementById(`personal-info-${nextStep}`);
		setTimeout(() => {
			if (inputToFocus) {
				inputToFocus.focus()
			}
		}, 500)

		document
			.getElementById(`personal-info-form-${nextStep}`)
			.scrollIntoView({
				behavior: "smooth",
			});
		currentPersonalInfoStep++;

		while (1) {
			if (!fieldsToIgnore.includes(currentPersonalInfoStep)) {
				break
			}
			currentPersonalInfoStep++
		}

		const steps = document.querySelectorAll(".step");
		steps[currentStep - 1].style.backgroundColor = "#FFFFFF";
		steps[nextStep - 1].style.backgroundColor = "#33D4FF";
		currentStep++;
		while (1) {
			if (!fieldsToIgnore.includes(currentStep)) {
				break
			}
			currentStep++
		}
	}


}

function formatPhone() {
	const inputElement = document.getElementById("personal-info-2");

	inputElement.addEventListener("input", function (e) {
		let input = e.target.value;
		const previousValue = e.target.getAttribute("data-previous") || "";

		const isDeleting = input.length < previousValue.length;

		input = input.replace(/\D/g, "");

		if (!isDeleting) {
			if (input.length > 10) {
				input = input.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
			} else if (input.length > 6) {
				input = input.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
			} else if (input.length > 2) {
				input = input.replace(/(\d{2})/, "($1) ");
			}
		}

		e.target.value = input;
		e.target.setAttribute("data-previous", input);
	});
}

function setFormFormat(planType) {
	if (planType == 'consulting') {
		const invoicingRadioButtons = document.querySelectorAll('input[name="INVOICING"]');
		invoicingRadioButtons.forEach((radio) => {
			radio.required = true;
		});
	} else if (['software', 'acceleration'].includes(planType)) {
		const erpRadioButtons = document.querySelectorAll('input[name="ERP"]');
		erpRadioButtons.forEach((radio) => {
			radio.required = true;
		});
	}
}

function validateCNPJ(cnpj) {
	cnpj = cnpj.replace(/[^\d]+/g, "");

	if (cnpj.length !== 14) return false;

	if (/^(\d)\1+$/.test(cnpj)) return false;

	let tamanho = cnpj.length - 2;
	let numeros = cnpj.substring(0, tamanho);
	let digitos = cnpj.substring(tamanho);
	let soma = 0;
	let pos = tamanho - 7;

	for (let i = tamanho; i >= 1; i--) {
		soma += numeros.charAt(tamanho - i) * pos--;
		if (pos < 2) pos = 9;
	}

	let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
	if (resultado != digitos.charAt(0)) return false;

	tamanho++;
	numeros = cnpj.substring(0, tamanho);
	soma = 0;
	pos = tamanho - 7;

	for (let i = tamanho; i >= 1; i--) {
		soma += numeros.charAt(tamanho - i) * pos--;
		if (pos < 2) pos = 9;
	}

	resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
	return resultado == digitos.charAt(1);
}

function applyCNPJMask(value) {
	return value
		.replace(/\D/g, "")
		.replace(/^(\d{2})(\d)/, "$1.$2")
		.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
		.replace(/\.(\d{3})(\d)/, ".$1/$2")
		.replace(/(\d{4})(\d)/, "$1-$2")
		.slice(0, 18);
}

function validateFields(field, payload, event) {
	const originalText = disableButton(field)

	const url = `${API_URL}/api/validate_field`
	fetch(url, {
		method: "POST",
		headers: {
			'Content-Type': 'application/json',
			Accept: "application/json",
		},
		body: JSON.stringify(payload)
	}).then((response) => {
		return response.json()
	}).then(data => {
		if (data != 'OK') {
			emailError = document.getElementById(`${field}-error`)
			emailError.innerHTML = data
			emailError.style.display = 'block'
		} else {
			getNextQuestion(event)
		}
	}).finally(() => {
		enableButton(field, originalText)
	});
}

function checkUnknownPlan(plan) {
	if (plan === 'unknown') {
		const fieldsToHide = [5, 7, 9]

		fieldsToHide.forEach((field) => {
			const input = document.getElementById(`personal-info-form-${field}`)
			const step = document.getElementById(`step-${field}`)
			input.style.display = 'none'
			step.style.display = 'none'
		})
	}
}

document.addEventListener("DOMContentLoaded", function () {
	document.getElementById("personal-info-5").addEventListener("input", function (e) {
		e.target.value = applyCNPJMask(e.target.value);
	});

	for (i = 2; i < 11; i = i + 1) {
		const input = document.getElementById(`personal-info-form-${i}`)
		input.style.opacity = 0.2
	}

	const dropdown = new Choices('#searchable-dropdown', {
		searchEnabled: true,
		itemSelectText: 'Selecionar',
	});

	for (const [key, _] of Object.entries(sectorToSegmentMapping)) {
		dropdown.setChoices([{ value: key, label: key }], 'value', 'label', false);
	}

	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	planType = urlParams.get('type');
	if (planType === 'u')
		planType = 'unknown'
	const aionPlan = document.getElementById("aion-plan");
	checkUnknownPlan(planType)
	if (planHumanizedName[planType]) {
		aionPlan.innerHTML = `${planHumanizedName[planType]} Aion`
	}
	const steps = document.querySelectorAll(".step");
	setFormFormat(planType);

	steps[currentStep].style.backgroundColor = "#33D4FF";
	currentStep++;


	const personalContent = document.getElementById("send-personal-content");
	personalContent.style.display = "block";
	setTimeout(() => {
		personalContent.style.opacity = 1;
	});

	form3 = document.getElementById("personal-info-form-2");
	form3.style.opacity = 0.2;
	currentPersonalInfoStep++;

	const personalInfoForms = document.querySelectorAll(".personal-info-form");

	personalInfoForms.forEach((personalInfoForm) => {

		const dontUpdateFields = ["personal-info-form-1", "personal-info-form-2"]

		if (!dontUpdateFields.includes(personalInfoForm.id)) {
			personalInfoForm.addEventListener("submit", (event) => {
				event.preventDefault()
				updateLead()
			});
		}

		if (personalInfoForm.id === "personal-info-form-10") {
			personalInfoForm.addEventListener("submit", (event) => {
				event.preventDefault()
				let selectedValue = document.querySelector('input[name="ERP"]:checked').value;
				if (selectedValue === 'other') {
					selectedValue = document.getElementById("erp-other").value
				}
				if (!selectedValue)
					document.getElementById('erp-error').style.display = 'block'
				else
					getWhatsAppContact(event)
			});
		}
		else if (personalInfoForm.id === "personal-info-form-2") {
			personalInfoForm.addEventListener("submit", (event) => {
				event.preventDefault()
				const fieldId = 'personal-info-2'
				const phoneInput = document.getElementById(fieldId);
				const phoneValue = phoneInput.value.replace(/\D/g, '');
				const phoneErrorMsg = document.getElementById('phone-error-msg');
				if (phoneValue.length === 10 || phoneValue.length === 11) {
					const buttonText = disableButton(fieldId)
					phoneErrorMsg.style.display = 'none';
					sendLead().finally(() => {
						enableButton(fieldId, buttonText)
						const formBeforeValue = document.getElementById(`personal-info-${currentPersonalInfoStep}`).value;
						if (formBeforeValue) getNextQuestion(event)
					})
				}else {
					phoneErrorMsg.style.display = 'inline';
				}
			});
		} else if (personalInfoForm.id === "personal-info-form-3") {
			personalInfoForm.addEventListener("submit", (event) => {
				event.preventDefault();
				const formBeforeValue = document.getElementById("personal-info-2").value;
				if (formBeforeValue) {
					const emailInput = document.getElementById('email');
					const email = emailInput.value.trim();

					const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

					if (!emailRegex.test(email)) {
						emailError = document.getElementById('email-error')
						emailError.innerHTML = 'Por favor, digite um email válido.'
						emailError.style.display = 'block'
					} else {
						const emailValidatePayload = {
							"email": email,
						}
						validateFields('email', emailValidatePayload, event)
					}
				}
			});
		} else if (personalInfoForm.id === "personal-info-form-4") {
			personalInfoForm.addEventListener("submit", (event) => {
				event.preventDefault();
				const formBeforeValue = document.getElementById("email").value;
				if (formBeforeValue) {
					const companyInput = document.getElementById('personal-info-4');
					const company = companyInput.value.trim();
					const companyValidatePayload = {
						"company": company,
					}
					validateFields('company', companyValidatePayload, event)
				}
			});
		} else if (personalInfoForm.id === "personal-info-form-5") {
			personalInfoForm.addEventListener("submit", (event) => {
				event.preventDefault();
				const cnpjInput = document.getElementById("personal-info-5");
				const formBeforeValue = document.getElementById("personal-info-4").value;
				if (formBeforeValue) {
					if (!validateCNPJ(cnpjInput.value)) {
						document.getElementById('cnpj-error').style.display = 'block'
					} else
						getNextQuestion(event)
				}

			});
		} else {
			personalInfoForm.addEventListener("submit", (event) => {
				event.preventDefault()
				if (currentPersonalInfoStep > 0 && currentPersonalInfoStep < 6) {
					const formBeforeValue = document.getElementById(`personal-info-${currentPersonalInfoStep}`).value;
					if (formBeforeValue)
						getNextQuestion(event)
				} else
					getNextQuestion(event)
			});
		}
	});

	const erpOther = document.getElementById("erp-other");
	erpOther.style.display = "none";

	document.querySelectorAll('input[name="ERP"]').forEach((radio) => {
		radio.addEventListener('change', function () {
			if (this.id === "erp3") {
				erpOther.style.display = "block";
			} else {
				erpOther.style.display = "none";
			}
		});
	});

	formatPhone();

	const backButtons = document.querySelectorAll(".back-button");

	backButtons.forEach((backButton) => {
		backButton.addEventListener("click", (event) => {
			event.preventDefault();

			if (currentPersonalInfoStep > 1) {
				let fieldsToIgnore = []
				if (planType === 'unknown')
					fieldsToIgnore = [5, 7, 9]
				let previousStep = currentPersonalInfoStep - 1

				while (1) {
					if (!fieldsToIgnore.includes(previousStep)) {
						break
					}
					previousStep--
				}

				const currentForm = document.getElementById(`personal-info-form-${currentPersonalInfoStep}`);
				currentForm.style.opacity = 0.2;
				currentForm.scrollIntoView({
					behavior: "smooth",
				});

				const previousForm = document.getElementById(`personal-info-form-${previousStep}`);
				previousForm.style.opacity = 1;
				previousForm.scrollIntoView({
					behavior: "smooth",
				});

				currentPersonalInfoStep--;
				while (1) {
					if (!fieldsToIgnore.includes(currentPersonalInfoStep)) {
						break
					}
					currentPersonalInfoStep--
				}

				const steps = document.querySelectorAll(".step");
				if (steps.length > 0) {
					steps[currentStep - 1].style.backgroundColor = "#FFFFFF";
					steps[previousStep - 1].style.backgroundColor = "#33D4FF";
				}
				currentStep--;

				while (1) {
					if (!fieldsToIgnore.includes(currentStep)) {
						break
					}
					currentStep--
				}
			}
		})
	})

	setupWhatsAppLinks('desktop-whatsapp-link', 'mobile-whatsapp-link');

});
