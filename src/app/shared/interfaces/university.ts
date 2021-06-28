export interface University {
	id?: number | null;
	name?: string;
	website?: string;
	url_linkedin?: string;
	city_id?: string;
	country_id?: string;
	organizational_structure_id?: number;
	purchase_policy_file?: string;
	academic_regulation_file?: string;
	public_log_file?: string;
	bank_statement_file?: string;
	utility_receipt_file?: string;
	contract_file?: string;
	instruction_letter_file?: string;
	about?: string;
	foundation_year?: string;
	logo?: string;
	profile_img?: string;
	ranking?: number;
	verified_status?: number;
	verified_reason?: string;
	created_at?: string;
	updated_at?: string;
}
