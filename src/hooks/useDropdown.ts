import gsap, { Power2 } from 'gsap';
import { RefObject, useEffect, useRef } from 'react';

const useDropdown = (
  dropdown: RefObject<HTMLElement>,
  dropdownActivator: RefObject<HTMLSpanElement>,
  dropdownLi: RefObject<HTMLLIElement>,
  dropdownType: 'studio' | 'aboutus',
) => {
  const dropdownState = useRef<'studio' | 'aboutus' | null>(null);

  useEffect(() => {
    // eslint-disable-next-line prefer-const
    let timer: number | null = null;

    let dropdownInnerText: 'Creative Studio' | 'About us' = 'Creative Studio';

    if (dropdownType === 'aboutus') {
      dropdownInnerText = 'About us';
    }

    //todo: only run if isn't touch device?
    const dropdownLogic = (
      e: MouseEvent,
      timer: number | null,
      dropdown: RefObject<HTMLElement>,
      dropdownActivator: RefObject<HTMLElement>,
      dropdownLi: RefObject<HTMLLIElement>,
    ) => {
      const dropdownActivatorStyles = getComputedStyle(
        dropdownActivator.current!,
      );
      const dropdownStyles = getComputedStyle(dropdown.current!);

      // console.log(dropdownStyles.clipPath);

      if (
        (e.target as Element).className !== undefined &&
        (e.target as Element).className !== null
      ) {
        if (typeof (e.target as Element).className === 'string') {
          if (
            (e.target as Element).className.includes('dropdown') ||
            (e.target as Element).className === 'Navbar_route__Fhuoi' ||
            (e.target as Element).className ===
              'Navbar_dropdown_activation__Y1nof'
          ) {
            // if (timer !== null) {
            //   window.clearTimeout(timer);
            //   timer = null;
            // }

            if (
              dropdownActivatorStyles.display === 'none' ||
              dropdownStyles.clipPath !==
                'polygon(0 0, 100% 0%, 100% 100%, 0 100%)' ||
              dropdownStyles.display === 'none'
            ) {
              if (
                dropdownStyles.clipPath !==
                'polygon(0 0, 100% 0%, 100% 110%, 0 110%)'
              ) {
                gsap.to(dropdown.current, {
                  clipPath: 'polygon(0 0, 100% 0%, 100% 110%, 0 110%)',
                  duration: 0.4,
                  ease: Power2.easeOut,
                });
              }

              dropdownActivator.current!.style.display = 'block';

              dropdownLi.current!.classList.add(
                'Navbar_dropdown_li_active__jLMu6',
              );

              dropdown.current!.style.display = 'block';

              // setTimeout(() => {
              // dropdown.current!.style.marginTop = '73px';
              // console.log('dropdown to studio');
              // setDropdownState('studio');
              // }, 1);
            }

            dropdownState.current = dropdownType;
          } else {
            // console.log(`timer leave: ${timer}`);

            // if (timer === null) {
            // console.log(`${timer}, ${typeof timer}`);
            // timer = window.setTimeout(() => {
            // console.log('leave');
            dropdownLi.current!.classList.remove(
              'Navbar_dropdown_li_active__jLMu6',
            );
            // dropdown.current!.style.display = 'none';

            dropdownActivator.current!.style.display = 'none';

            // dropdown.current!.style.marginTop = '-82px';

            if (
              dropdownStyles.clipPath !==
              'polygon(0 0, 100% 0%, 100% 0.1%, 0 0.1%)'
            ) {
              gsap.to(dropdown.current, {
                clipPath: 'polygon(0 0, 100% 0%, 100% 0.1%, 0 0.1%)',
                duration: 0.4,
                ease: Power2.easeOut,
              });
            }

            setTimeout(() => {
              dropdown.current!.style.display = 'none';
              // console.log('dropdown to null');
              // setDropdownState(null);
            }, 400);

            dropdownState.current = null;
            // }, 100);
            // }
          }
        }
      }
    };

    window.addEventListener('mousemove', e => {
      // dropdownLogic(e, timer, studioDropdown, studioDropdownActivator);

      // console.log((e.target as HTMLElement).innerText === 'Creative Studio');

      if (
        (e.target as HTMLElement).innerText === dropdownInnerText ||
        dropdownState.current === dropdownType
      ) {
        dropdownLogic(e, timer, dropdown, dropdownActivator, dropdownLi);
      }
    });

    return () => {
      // window.removeEventListener('mousemove', e => dropdownLogic(e));
    };
  }, []);
};

export default useDropdown;

//* backup **************** */

// import { RefObject, useEffect, useRef } from 'react';

// const useDropdown = (
//   studioDropdown: RefObject<HTMLElement>,
//   studioDropdownActivator: RefObject<HTMLSpanElement>,
//   studioDropdownLi: RefObject<HTMLLIElement>,
//   dropdownType: 'studio' | 'aboutus',
// ) => {
//   const dropdownState = useRef<'studio' | 'aboutus' | null>(null);

//   useEffect(() => {
//     // eslint-disable-next-line prefer-const
//     let timer: number | null = null;

//     let dropdownInnerText: 'Creative Studio' | 'About Us' = 'Creative Studio';

//     if (dropdownType === 'aboutus') {
//       dropdownInnerText = 'About Us';
//     }

//     //todo: only run if isn't touch device?
//     const dropdownLogic = (
//       e: MouseEvent,
//       timer: number | null,
//       dropdown: RefObject<HTMLElement>,
//       dropdownActivator: RefObject<HTMLElement>,
//       dropdownLi: RefObject<HTMLLIElement>,
//     ) => {
//       const dropdownActivatorStyles = getComputedStyle(
//         dropdownActivator.current!,
//       );
//       const dropdownStyles = getComputedStyle(dropdown.current!);

//       if (
//         (e.target as Element).className !== undefined &&
//         (e.target as Element).className !== null
//       ) {
//         if (typeof (e.target as Element).className === 'string') {
//           if (
//             (e.target as Element).className.includes('dropdown') ||
//             (e.target as Element).className === 'Navbar_route__Fhuoi' ||
//             (e.target as Element).className ===
//               'Navbar_dropdown_activation__Y1nof'
//           ) {
//             if (timer !== null) {
//               window.clearTimeout(timer);
//               timer = null;
//             }

//             if (
//               dropdownActivatorStyles.display === 'none' ||
//               dropdownStyles.marginTop !== '73px' ||
//               dropdownStyles.display === 'none'
//             ) {
//               dropdownActivator.current!.style.display = 'block';

//               dropdownLi.current!.classList.add(
//                 'Navbar_dropdown_li_active__jLMu6',
//               );

//               dropdown.current!.style.display = 'block';

//               setTimeout(() => {
//                 dropdown.current!.style.marginTop = '73px';
//                 // console.log('dropdown to studio');
//                 // setDropdownState('studio');
//               }, 1);
//             }

//             dropdownState.current = dropdownType;
//           } else {
//             // console.log(`timer leave: ${timer}`);

//             // if (timer === null) {
//             // console.log(`${timer}, ${typeof timer}`);
//             // timer = window.setTimeout(() => {
//             // console.log('leave');
//             dropdownLi.current!.classList.remove(
//               'Navbar_dropdown_li_active__jLMu6',
//             );
//             // dropdown.current!.style.display = 'none';

//             dropdownActivator.current!.style.display = 'none';

//             dropdown.current!.style.marginTop = '-82px';

//             setTimeout(() => {
//               dropdown.current!.style.display = 'none';
//               // console.log('dropdown to null');
//               // setDropdownState(null);
//             }, 250);

//             dropdownState.current = null;
//             // }, 100);
//             // }
//           }
//         }
//       }
//     };

//     window.addEventListener('mousemove', e => {
//       // dropdownLogic(e, timer, studioDropdown, studioDropdownActivator);

//       // console.log((e.target as HTMLElement).innerText === 'Creative Studio');

//       if (
//         (e.target as HTMLElement).innerText === dropdownInnerText ||
//         dropdownState.current === dropdownType
//       ) {
//         dropdownLogic(
//           e,
//           timer,
//           studioDropdown,
//           studioDropdownActivator,
//           studioDropdownLi,
//         );
//       }
//     });

//     return () => {
//       // window.removeEventListener('mousemove', e => dropdownLogic(e));
//     };
//   }, []);
// };

// export default useDropdown;
