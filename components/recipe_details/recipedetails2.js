import React from 'react';
import { Col, Container, Form, FormGroup, Label, Row, Table } from 'reactstrap';
import Select from 'react-select';
import style from '../../styles/common.module.scss';
var Fraction = require('fractional').Fraction;

const options = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
  { value: '6', label: '6' },
  { value: '7', label: '7' },
  { value: '8', label: '8' },
  { value: '9', label: '9' },
  { value: '10', label: '10' },
];
export default class Recipe2 extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    optionValue: { value: '2', label: '2' },
  };
  render() {
    return (
      <div>
        {this.props.recipeDetail !== '' ? (
          <section className='recipe-details-section-2'>
            <Container fluid='md'>
              <div className='content-right-data common-categary sm-mb-0'>
                <Row className='mb-35 align-items-center'>
                  <Col xl={6} lg={12}>
                    <div className='title d-flex align-items-center xl-mb-4'>
                      <h2 className={`${style.h2} mb-0`}>Ingredients</h2>
                    </div>
                  </Col>
                  <Col xl={6} lg={12}>
                    <Form inline className='justify-content-end small-start'>
                      <FormGroup className='mb-0 sort-bar small-bottom'>
                        <Label className='mr-3 pr-0 mb-0 label-text'>
                          Serving :
                        </Label>
                        <div className='min-215 min-h-48'>
                          <Select
                            options={options}
                            defaultValue={options[1]}
                            // placeholder='No.'
                            value={this.state.optionValue}
                            onChange={(val) =>
                              this.setState({ optionValue: val })
                            }
                          />
                        </div>
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
              </div>
              <Table responsive>
                <tbody>
                  {this.props.recipeDetail.ingredients.map((item) => (
                    <tr>
                      <td>
                        <h3 className={style.h3}>{item.name}</h3>
                      </td>
                      <td>
                        <h3 className={`${style.h3} f29`}>
                          <span>
                            {new Fraction(
                              (item.quantity / 2) *
                                Number(this.state.optionValue.value)
                            )
                              .toString()
                              .split(' ')[0] +
                              ' ' +
                              (new Fraction(
                                (item.quantity / 2) *
                                  Number(this.state.optionValue.value)
                              )
                                .toString()
                                .split(' ')[1]
                                ? '& ' +
                                  new Fraction(
                                    (item.quantity / 2) *
                                      Number(this.state.optionValue.value)
                                  )
                                    .toString()
                                    .split(' ')[1] +
                                  ' '
                                : '') +
                              (item.unitName !== '' &&
                              item.unitName !== null &&
                              item.unitName !== undefined
                                ? item.unitName
                                : '')}
                          </span>
                        </h3>
                      </td>
                    </tr>
                  ))}
                  {this.props.recipeDetail.ingredients.length === 0
                    ? 'No Ingredients Available'
                    : null}
                </tbody>
              </Table>
              {this.props.recipeDetail.additionalInfo &&
              this.props.recipeDetail.additionalInfo !== '' ? (
                <div>
                  <div className='title d-flex align-items-center xl-mb-4 mt-4'>
                    <h2 className={`${style.h2} mb-0`}>
                      Additional Information
                    </h2>
                  </div>
                  <div
                    className='ingredients-alt-details'
                    style={{ whiteSpace: 'pre-wrap' }}
                  >
                    <p>{this.props.recipeDetail.additionalInfo}</p>
                  </div>
                </div>
              ) : null}
            </Container>
          </section>
        ) : null}
      </div>
    );
  }
}
