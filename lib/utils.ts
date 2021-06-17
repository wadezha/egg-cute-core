
export default class Utils {

  public static toUnderLine(name) {
    return name.replace(/([A-Z])/g, '_$1').toLowerCase();
  }

}