export  class ModeloCarta {
    private data: Date;
    private localLoja: string;
    private enderecoLoja:String;
    private nomePromotor: String;
    private cartPromotor: String;
    private serie: number;
    private identidade: number;
    private nomeEmpresa: string;

    /**
     * Getter $data
     * @return {Date}
     */
	public get $data(): Date {
		return this.data;
	}

    /**
     * Getter $localLoja
     * @return {string}
     */
	public get $localLoja(): string {
		return this.localLoja;
	}

    /**
     * Getter $enderecoLoja
     * @return {String}
     */
	public get $enderecoLoja(): String {
		return this.enderecoLoja;
	}

    /**
     * Getter $nomePromotor
     * @return {String}
     */
	public get $nomePromotor(): String {
		return this.nomePromotor;
	}

    /**
     * Getter $cartPromotor
     * @return {String}
     */
	public get $cartPromotor(): String {
		return this.cartPromotor;
	}

    /**
     * Getter $serie
     * @return {number}
     */
	public get $serie(): number {
		return this.serie;
	}

    /**
     * Getter $identidade
     * @return {number}
     */
	public get $identidade(): number {
		return this.identidade;
	}

    /**
     * Getter $nomeEmpresa
     * @return {string}
     */
	public get $nomeEmpresa(): string {
		return this.nomeEmpresa;
	}

    /**
     * Setter $data
     * @param {Date} value
     */
	public set $data(value: Date) {
		this.data = value;
	}

    /**
     * Setter $localLoja
     * @param {string} value
     */
	public set $localLoja(value: string) {
		this.localLoja = value;
	}

    /**
     * Setter $enderecoLoja
     * @param {String} value
     */
	public set $enderecoLoja(value: String) {
		this.enderecoLoja = value;
	}

    /**
     * Setter $nomePromotor
     * @param {String} value
     */
	public set $nomePromotor(value: String) {
		this.nomePromotor = value;
	}

    /**
     * Setter $cartPromotor
     * @param {String} value
     */
	public set $cartPromotor(value: String) {
		this.cartPromotor = value;
	}

    /**
     * Setter $serie
     * @param {number} value
     */
	public set $serie(value: number) {
		this.serie = value;
	}

    /**
     * Setter $identidade
     * @param {number} value
     */
	public set $identidade(value: number) {
		this.identidade = value;
	}

    /**
     * Setter $nomeEmpresa
     * @param {string} value
     */
	public set $nomeEmpresa(value: string) {
		this.nomeEmpresa = value;
	}
}