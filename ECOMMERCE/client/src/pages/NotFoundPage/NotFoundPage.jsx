import React from 'react';

const NotFoundPage = () => {
  const styles = {
    errorContent: {
      padding: '0 0 70px',
      textAlign: 'center',
    },
    errorText: {
      textAlign: 'center',
    },
    error: {
      fontSize: '180px',
      fontWeight: '100',
    },
    sheep: {
      display: 'inline-block',
      position: 'relative',
      fontSize: '1em',
      marginBottom: '70px',
    },
    top: {
      position: 'relative',
      animation: 'bob 1s infinite',
    },
    body: {
      display: 'inline-block',
      width: '7em',
      height: '7em',
      borderRadius: '100%',
      background: '#0054D1',
      position: 'relative',
      verticalAlign: 'middle',
      marginRight: '-3em',
    },
    head: {
      display: 'inline-block',
      width: '5em',
      height: '5em',
      borderRadius: '100%',
      background: '#253858',
      verticalAlign: 'middle',
      position: 'relative',
      top: '1em',
      transform: 'rotate(30deg)',
    },
    eye: {
      display: 'inline-block',
      width: '1em',
      height: '1em',
      borderRadius: '100%',
      background: 'white',
      position: 'absolute',
      overflow: 'hidden',
    },
    ear: {
      background: '#253858',
      width: '50%',
      height: '30%',
      borderRadius: '100%',
      position: 'absolute',
    },
    legs: {
      display: 'inline-block',
      position: 'absolute',
      top: '80%',
      left: '10%',
      zIndex: '-1',
    },
    leg: {
      display: 'inline-block',
      background: '#141214',
      width: '0.5em',
      height: '2.5em',
      margin: '0.2em',
    },
    button: {
      fontSize: '15px',
      fontWeight: '600',
      padding: '9px 25px',
      borderWidth: '2px',
      borderRadius: '30px',
      textDecoration: 'none',
      color: '#fff',
      backgroundColor: '#0069d9',
      borderColor: '#0062cc',
      display: 'inline-block',
      cursor: 'pointer',
    },
  };

  const title = 'Oops! Page Not Found';
  const message = 'The page you are looking for does not exist or another error occurred.';

  return (
    <div style={styles.errorContent}>
      <div style={styles.errorText}>
        <h1 style={styles.error}>404 Error</h1>
        <div style={styles.sheep}>
          <div style={styles.top}>
            <div style={styles.body}></div>
            <div style={styles.head}>
              <div style={{ ...styles.eye, top: '1.7em', right: '-2%' }}></div>
              <div style={{ ...styles.eye, top: '1.7em', right: '2.5em' }}></div>
              <div style={{ ...styles.ear, top: '5%', left: '-10%', transform: 'rotate(-30deg)' }}></div>
              <div style={{ ...styles.ear, top: '2%', right: '-5%', transform: 'rotate(20deg)' }}></div>
            </div>
          </div>
          <div style={styles.legs}>
            <div style={styles.leg}></div>
            <div style={styles.leg}></div>
            <div style={styles.leg}></div>
            <div style={styles.leg}></div>
          </div>
        </div>
        <h4>{title}</h4>
        <p>{message}</p>
        <a href="/" style={styles.button}>
          Quay lại trang chủ
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;
