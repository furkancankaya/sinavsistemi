import React, { Component } from 'react'

export default class Results extends Component {
  render() {
    const { kisiler } = this.props;
    return (
        <table class="table">
        <thead>
          <tr>
            
            <th scope="col">İsim</th>
            <th scope="col">Tarih</th>
            <th scope="col">Sonuç</th>
          </tr>
        </thead>
        <tbody>
          {kisiler.forEach(kisi => {
            <tr>
            
            <td>{kisi.ad}</td>
            <td>{kisi.tarih}</td>
            <td>@{kisi.dogruSayisi}</td>
          </tr>
          })
          }
          
        </tbody>
      </table>
    )
  }
}
