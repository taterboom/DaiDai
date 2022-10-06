type LoadingProps = {
  children?: React.ReactNode
}

const Loading = (props: LoadingProps) => {
  return (
    <div className="">
      <svg
        width="41"
        height="37"
        viewBox="0 0 41 37"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10.4092 0L3.02808 6.15089H17.3171L10.4092 0Z" fill="white" />
        <path d="M30.2813 0.0947266L22.9003 6.24562H37.1893L30.2813 0.0947266Z" fill="white" />
        <path
          d="M0 8.62386L5.29923 4.2583L34.445 8.62386L39.7442 32.6344L34.445 37H0V8.62386Z"
          fill="white"
        />
        <path
          d="M5.29919 4.2583H30.2813C35.5075 4.2583 39.7442 8.49499 39.7442 13.7212V32.647H5.29919V4.2583Z"
          fill="#0F1729"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M30.2813 5.58311H6.624V31.3222H38.4194V13.7212C38.4194 9.22666 34.7758 5.58311 30.2813 5.58311ZM5.29919 4.2583V32.647H39.7442V13.7212C39.7442 8.49499 35.5075 4.2583 30.2813 4.2583H5.29919Z"
          fill="white"
        />
        <path className="squat" d="M21.6482 18.6736H24.128V21.1534H21.6482V18.6736Z" fill="white" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.9839 16.3708H12.2605V23.4559H16.9839V18.7325H14.6222V16.3709H16.9839V16.3708Z"
          fill="white"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M33.5157 16.3708H28.7924V23.4559H33.5157V18.7325H31.154V16.3709H33.5157V16.3708Z"
          fill="white"
        />
        <path d="M19.3456 21.1533H21.6482V23.456H19.3456V21.1533Z" fill="white" />
        <path d="M24.1281 21.1533H26.4307V23.456H24.1281V21.1533Z" fill="white" />
        <path d="M9.65425 22.7473H11.0207L10.2615 25.05H8.89514L9.65425 22.7473Z" fill="#5665DE" />
        <path d="M32.921 22.7473H34.4013L33.5789 25.05H32.0986L32.921 22.7473Z" fill="#5665DE" />
        <path d="M11.843 22.7473H13.3233L12.5009 25.05H11.0206L11.843 22.7473Z" fill="#5665DE" />
        <path d="M35.1605 22.7473H36.5269L35.7678 25.05H34.4014L35.1605 22.7473Z" fill="#5665DE" />
        <path
          d="M33.4988 3.37988H32.9988V3.87988V4.32618H32.5525H32.0525V4.82618V6.5295V7.0295H32.5525H32.9988V7.92209H32.5525H32.0525V8.42209V10.1254V10.6254H32.5525H32.9988V11.0717V11.5717H33.4988H35.2021H35.7021V11.0717V10.6254H36.5947V11.0717V11.5717H37.0947H38.798H39.298V11.0717V10.6254H39.7443H40.2443V10.1254V8.42209V7.92209H39.7443H39.298V7.02951H39.7443H40.2443V6.52951V4.82618V4.32618H39.7443H39.298V3.87988V3.37988H38.798H37.0947H36.5947V3.87988V4.32618L35.7021 4.32618V3.87988V3.37988H35.2021H33.4988ZM35.7021 7.02951H36.5947V7.92209H35.7021V7.02951Z"
          fill="#5665DE"
          stroke="white"
        />
      </svg>
    </div>
  )
}

export default Loading