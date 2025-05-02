'use client'

import React from 'react'
import Select, { StylesConfig } from 'react-select';

type OptionType = {
	value: string;
	label: string;
};

const InputSelect = ({ options }: any) => (
	<Select options={options} placeholder="Selecciona" noOptionsMessage={() => 'Sin Opciones'} />
)

export default InputSelect;