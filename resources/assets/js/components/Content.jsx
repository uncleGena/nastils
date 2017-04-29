import React from 'react'


export default class Content extends React.Component {
  render() {
    // $(".button-collapse").sideNav();
    return (
      <div className="container">
        <div className="section">

          <div className="row">
            <div className="col s12 m12">
              <a className='dropdown-button btn' href='#' data-activates='dropdown1'>Drop Me!</a>

              <ul id='dropdown1' className='dropdown-content'>
                <li><a href="#!">one</a></li>
                <li><a href="#!">two</a></li>
                <li className="divider"></li>
                <li><a href="#!">three</a></li>
                <li><a href="#!"><i className="material-icons">view_module</i>four</a></li>
                <li><a href="#!"><i className="material-icons">cloud</i>five</a></li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col s12 m12">

              <ul className="collapsible" data-collapsible="accordion">
                <li>
                  <div className="collapsible-header"><i className="material-icons">filter_drama</i>First</div>
                  <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                </li>
                <li>
                  <div className="collapsible-header"><i className="material-icons">place</i>Second</div>
                  <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                </li>
                <li>
                  <div className="collapsible-header"><i className="material-icons">whatshot</i>Third</div>
                  <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                </li>
              </ul>
            </div>
          </div>
          <div className="row">

            <div className="col s12 m4">
              <div className="icon-block">
                <h2 className="center light-blue-text"><i className="material-icons">flash_on</i></h2>
                <h5 className="center">Speeds up development</h5>

                <p className="light">We did most of the heavy lifting for you to provide a default stylings that incorporate our custom components. Additionally, we refined animations and transitions to provide a smoother experience for developers.</p>
              </div>
            </div>

            <div className="col s12 m4">
              <div className="icon-block">
                <h2 className="center light-blue-text"><i className="material-icons">group</i></h2>
                <h5 className="center">User Experience Focused</h5>

                <p className="light">By utilizing elements and principles of Material Design, we were able to create a framework that incorporates components and animations that provide more feedback to users. Additionally, a single underlying responsive system across all platforms allow for a more unified user experience.</p>
              </div>
            </div>

            <div className="col s12 m4">
              <div className="icon-block">
                <h2 className="center light-blue-text"><i className="material-icons">settings</i></h2>
                <h5 className="center">Easy to work with</h5>

                <p className="light">We have provided detailed documentation as well as specific code examples to help new users get started. We are also always open to feedback and can answer any questions a user may have about Materialize.</p>
              </div>
            </div>
          </div>

        </div>
        <br/>
        <br/>

        <div className="section">

        </div>
      </div>
    )
  }
}
