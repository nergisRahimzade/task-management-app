  import './Header.css';

  export function Header() {
    return (
      <div className='header-container'>
        <div className='header-title'>
          Title
        </div>

        <div className='header-description'>
          Description
        </div>

        <div className='header-status'>
          Status
        </div>

        <div className='header-due-date'>
          Due Date
        </div>

        <div className='header-due-date'>
          Actions
        </div>
      </div>
    );
  }