import React from 'react';
import {Picker} from 'native-base'
import {View} from 'react-native'
import ingressocom from "../services/ingressocom";

export default class CityCombo extends React.Component {
    state = {
        city: [],
        cities: [],
        uf:'PA'
    }

    async componentDidMount(): void {
        await this.loadCities();
    }

    async componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
       await this.loadCities();
    }

    loadCities = async () => {
        const response = await ingressocom.get(`/states/${this.state.uf}`)
        const {cities} = response.data
        this.setState({
            cities: cities
        })
    }

    onValueChange(value: string) {
        this.props.onValueChange(value);
        this.setState({city: value});
    }

    onValueChangeUF(value: string) {
        this.setState({uf: value});
        this.loadCities();
    }

    renderPicker(city) {
        return (
            <Picker.Item label={city.name} value={city.id} key={city.id}/>
        )
    }

    render() {
        const cities = this.state.cities
        return (
            <View>
                <Picker
                    mode="dropdown"
                    placeholder="Select One"
                    selectedValue={this.state.uf}
                    onValueChange={this.onValueChangeUF.bind(this)}
                >
                    <Picker.Item label="Pará" value="PA" key="PA"/>
                    <Picker.Item label="Rio de Janeiro" value="RJ" key="RJ"/>
                    <Picker.Item label="Roraima" value="RR" key="RR"/>
                    <Picker.Item label="São Paulo" value="SP" key="SP"/>
                </Picker>
            <Picker
                mode="dropdown"
                placeholder="Select One"
                selectedValue={this.state.city}
                onValueChange={this.onValueChange.bind(this)}
            >
                {cities.map(city => {
                    return (this.renderPicker(city))
                })
                }
            </Picker>
            </View>
        )
    }
}